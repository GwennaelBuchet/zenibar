"use strict";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let ws = require("nodejs-websocket");

// Bar data, with history, beers and costumers
let bar = require("./../data/zenibar_history.json");
let stocks = require("./../data/stocks.json");
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

            customer.nbBeers += 1;

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

            for (let b of customer.suitableBeers) {
                if (b["id"] == beerId) {
                    b.stock -= 1;
                }
            }

            let beer;
            for (beer of bar.beers) {
                if (beer["id"] == beerId) {
                    customer.amount -= beer.price;
                    beer.stock -= 1;
                }
            }

            res.send({"customer": customer, "beers": bar.beers});
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

app.get("/stocknbeers", function (req, res) {

    let snb = {};
    for (let i = 0; i < stocks.length; i++) {
        let b = getBeer(i + 1);

        snb[b.id + " " + b.brand + " " + b.model] = stocks[i];
    }

    res.send(snb);
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

    let a, b, c;
    for (a = 0; a < bar.beers.length; a++) {
        let i = bar.beers[a].id - 1;
        bar.beers[a].stock = stocks[i];
    }

    for (c of bar.customers) {
        c.nbBeers = 0;
        for (b = 0; b < c.suitableBeers.length; b++) {
            let i = c.suitableBeers[b].id - 1;
            c.suitableBeers[b].stock = stocks[i];
            c.suitableBeers[b].isSelected = false;
        }
    }
    console.log("Stocks updated");
}();

let computeTastesForCustomer = function (customer) {

    let habits = {};
    let nbUptakes = 0;

    for (let u of customer.uptakes) {
        for (let b of u.beersId) {
            nbUptakes++;

            if (!habits.hasOwnProperty("" + b)) {
                habits["" + b] = [0, 0];
            }

            let h = habits["" + b];
            h[0]++;
        }
    }

    // now compute percentages for each beer consumed
    for (let b in habits) {
        habits["" + b][1] = habits["" + b][0] * 100 / nbUptakes;
    }

    customer.habits = habits;

    let strongnessMin = 100;
    let strongnessMax = 0;
    let styles = [];
    let colors = [];
    let origins = [];

    for (let b of bar.beers) {
        let bid = b.id;
        //unfortunately, the file is not very JSON compliant and keys are id of beers :/
        //if (habits[bid] !== null && habits[bid] !== undefined)
        if (habits.hasOwnProperty("" + bid)) {

            let percent = habits[bid][1];
            //only take care of beers consumed often (more than 12% of time)
            if (percent >= 12) {
                if (b.strongness < strongnessMin) strongnessMin = b.strongness;
                if (b.strongness > strongnessMax) strongnessMax = b.strongness;

                if (styles.indexOf(b.style) === -1) styles.push(b.style);
                if (colors.indexOf(b.color) === -1) colors.push(b.color);
                if (origins.indexOf(b.origin) === -1) origins.push(b.origin);
            }
        }
    }

    customer.preferences = {};
    customer.preferences.strongnessMin = strongnessMin;
    customer.preferences.strongnessMax = strongnessMax;
    customer.preferences.styles = styles;
    customer.preferences.origins = origins;
    customer.preferences.colors = colors;
};

let computeSuitableBeersForCustomer = function (customer) {

    customer.suitableBeers = [];
    let p = customer.preferences;
    for (let beer of bar.beers) {
        if (beer.strongness >= p.strongnessMin
            && beer.strongness <= p.strongnessMax
            && p.styles.indexOf(beer.style) >= 0
            && p.origins.indexOf(beer.origin) >= 0
            && p.colors.indexOf(beer.color) >= 0) {
            customer.suitableBeers.push(beer);
        }

    }
};

let computeAllTastes = function () {

    for (let c of bar.customers) {
        computeTastesForCustomer(c);
        computeSuitableBeersForCustomer(c);
    }

    console.log("Preferences updated");

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
