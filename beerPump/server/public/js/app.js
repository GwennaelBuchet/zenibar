'use strict';

/*-----------------
 Filters
 -----------------*/

Vue.filter('uppercase', function (value) {
    return value.toUpperCase();
});

/*-----------------
 APP
 -----------------*/
new Vue({
    el: '#wrapper',

    data: {
        ws: null,
        beers: [],
        customer: null
    },

    created: function () {
        let self = this;

        fetch("http://" + window.location.hostname + ":8092/beers", {mode: 'cors'})
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.beers = data;
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });

        this.ws = new WebSocket("ws://" + window.location.hostname + ":8082");

        this.ws.onopen = function (event) {
            console.log("Websocket connection opened.");
        };
        this.ws.onmessage = function (event) {
            let jsonObject = JSON.parse(event.data);
            self.customer = jsonObject.customer;
            self.beers = jsonObject.beers;
            for (let beer of self.beers) {
                beer.isSelected = false;
            }
            console.log(self.customer.firstname + " " + self.customer.lastname);
        };
        this.ws.onerror = function (event) {
            console.log("Websocket connection error : " + event);
        };

        fetch("http://" + window.location.hostname + ":8092/connect",
            {
                mode: 'cors', method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'id=1'
            })
            .then(function (data) {
                console.log(data)
            })
            .catch(function (error) {
                console.log("Cannot connect with customer id");
            });
    },

    methods: {
        getBeerFromId: function (id) {
            for (let b of this.beers) {
                if (b.id == id)
                    return b;
            }
            return null;
        },

        getLastUptake: function () {
            if (this.customer === null || this.customer === undefined) {
                return null;
            }

            return this.customer.uptakes[this.customer.uptakes.length - 1];
        },

        deselectAllBeers:function() {
            for (let beer of self.beers) {
                beer.isSelected = false;
            }
        },

        orderNewBeer: function (beerId) {
            let self = this;

            console.log("app order: " + self.customer.id + " ; " + beerId);

            for (let beer of self.beers) {
                beer.isSelected = false;
                if (beer.id === beerId) {
                    beer.isSelected = true;
                }
            }

            for (let beer of self.customer.suitableBeers) {
                beer.isSelected = false;
                if (beer.id === beerId) {
                    beer.isSelected = true;
                }
            }

            //send data to the server
            fetch("http://" + window.location.hostname + ":8092/selectBeer",
                {
                    mode: 'cors', method: 'POST',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    body: 'customerId=' + self.customer.id + "&beerId=" + beerId
                })
                .then(function (data) {
                    console.log(data);
                    self.$forceUpdate();
                })
                .catch(function (error) {
                    console.log("Cannot connect with order a new beer :'( ");
                });

        }
    }
})
