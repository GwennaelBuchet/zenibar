"use strict";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let ws = require("nodejs-websocket");

// Bar data, with history, beers and costumers
let bar = require("./../data/zenibar_history.json");
let preferences = require("./../data/preferences_per_client");


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

            res.send(customer);
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

let readCustomersPreferences = function () {

    /*for (let c = 0; c < 50; c++) {
        let cp = preferences["" + c];
        let customer = getCustomer(c);

        customer.totalBeers = cp.total_beers;
        customer.preferences = [];
        customer.preferencesId = [];

        for (let b = 1; b <= bar.beers.length; b++) {
            if (cp[""+b] !== undefined) {
                customer.preferences.push(
                    {
                        "beerId":b,
                        "quantity":cp[""+b][0],
                        "percent":(100 - cp[""+b][1]) / 100
                    }
                );
                customer.preferencesId.push(b                );
            }
        }
    }*/

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
