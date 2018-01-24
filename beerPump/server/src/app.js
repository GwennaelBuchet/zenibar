"use strict";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let ws = require("nodejs-websocket");
let fetch = require('node-fetch');

let ip = require("ip");
console.log("BeerPump server adress: " + ip.address());

let MAINSERVER_IP = "http://localhost:8090"; //http://"+ip.address()+":8090"; // "http://192.168.43.97:8090";

let customer = null;
let selectedBeerId = 0;
let beers = [];

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(express.static('./public/'));
app.use(express.static('./node_modules/'));

app.get('/', function (req, res) {
    res.sendfile("public/index.html");
});

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

app.post("/connect", function (req, res) {
    let id = req.body.id;

    fetch(MAINSERVER_IP + "/customers/" + id, {mode: 'cors'})
        .then(status)
        .then(json)
        .then(function (data) {
            customer = data;
            serverws.connections.forEach(function (conn) {
                //conn.sendText(JSON.stringify(customer));
                conn.sendText(JSON.stringify({"customer": customer, "beers": beers}));
            })
        }).catch(function (error) {
        console.log('Request failed', error);
    });

});

app.post("/selectBeer", function (req, res) {
    let customerId = req.body.customerId;
    selectedBeerId = req.body.beerId;

    console.log("Beer selected for customer " + customerId + " : " + selectedBeerId);

    res.send(selectedBeerId);
});

app.post("/drink", function (req, res) {
    let customerId = customer.id; //req.body.customerId;
    let beerId = selectedBeerId; // req.body.beerId;

    console.log("BeerPump order: " + customerId + " ; " + beerId);

    fetch(MAINSERVER_IP + "/drink",
        {
            mode: 'cors', method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'customerId=' + customerId + "&beerId=" + beerId
        })
        .then(status)
        .then(json)
        .then(function (data) {
            customer = data.customer;
            beers = data.beers;
            serverws.connections.forEach(function (conn) {
                conn.sendText(JSON.stringify({"customer": customer, "beers": beers}));
                console.log(beers);
            })
        }).catch(function (error) {
        console.log('Request failed', error);
    });
});

app.get("/beers", function (req, res) {
    res.send(beers);
});

let getBeer = function (id) {
    for (let beer of beers) {
        if (beer["id"] == id) {
            return beer;
        }
    }

    return null;
};

/**
 * Server itself
 * @type {http.Server}
 */
let server = app.listen(8092, function () {
    //print few information about the server
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server running and listening @ " + host + ":" + port);
});

fetch(MAINSERVER_IP + "/beers/", {mode: 'cors'})
    .then(status)
    .then(json)
    .then(function (data) {
        beers = data;
    }).catch(function (error) {
    console.log('Request failed', error);
});

let serverws = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        console.log("Received " + str);
    });

    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    })
}).listen(8082);
