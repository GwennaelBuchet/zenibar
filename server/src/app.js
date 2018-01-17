"use strict";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let ws = require("nodejs-websocket");

// Bar data, with history, beers and costumers
let bar = require("./../data/zenibar_history.json");
let stocks = require("./../data/stocks.json");


let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(express.static('./public/'));
app.use(express.static('./node_modules/'));

app.get('/', function (req, res) {
    res.sendfile("public/index.html");
});

app.get('/pictures/:folder/:file', function (req, res) {
    let file = req.params.file;
    let folder = req.params.folder;
    res.sendFile('data/pictures/' + folder + "/" + file, {root: __dirname + "/../"});
});

app.post("/drink", function (req, res) {
    let customerId = req.body.customerId;
    let beerId = req.body.beerId;

    for (let customer of bar.customers) {
        if (customer["id"] == customerId) {

            let today = new Date();
            let d = today.getDate();
            let m = today.getMonth();
            let y = today.getFullYear();
            let lu = customer.uptakes[customer.uptakes.length - 1];

            let uptake = lu;

            if (lu.day !== d && lu.month !== m && lu.year !== y) {
                let uptake = {
                    day: d,
                    month: m,
                    year: y,
                    beersId: [beerId]
                };

                customer.uptakes.push(uptake);
            }
            else {
                lu.beersId.push(beerId);
            }

            let beer;
            for (beer of bar.beers) {
                if (beer["id"] == beerId) {
                    customer.amount -= beer.price;
                    beer.stock -= 1;
                }
            }

            res.send({"customer":customer, "beers":bar.beers});
            break;
        }
    }

    console.log("New uptake : " + customerId + ";" + beerId);
});


/**
 * Get a list of JSON for all registered drinkers
 * @path /customers
 * @HTTPMethod GET
 * @returns {string}
 */
app.get("/customers", function (req, res) {
    res.send(bar.customers);
});

app.get("/customers/:id", function (req, res) {
    let id = req.params.id;
    for (let customer of bar.customers) {
        if (customer["id"] == id) {
            res.send(customer);
            break;
        }
    }
});

app.get("/beers", function (req, res) {
    res.send(bar.beers);
});

let getCustomer = function (id) {
    for (let customer of bar.customers) {
        if (customer["id"] == id) {
            return customer;
        }
    }

    return null;
};

let getBeer = function (id) {
    for (let beer of bar.beers) {
        if (beer["id"] == id) {
            return beer;
        }
    }

    return null;
};


let readStocks = function () {

    for (let b = 0; b < bar.beers.length; b++) {
        bar.beers[b].stock = stocks[b];
    }
}();

/**
 * Server itself
 * @type {http.Server}
 */
let server = app.listen(8090, function () {
    //print few information about the server
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server running and listening @ " + host + ":" + port);
});

let serverws = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        console.log("Received " + str);
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    })
}).listen(8081);
