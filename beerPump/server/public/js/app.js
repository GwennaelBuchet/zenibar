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
        ws: null, // Our websocket
        customer:
            {
                "averageUptakesPerDay": 1,
                "firstname": "Josephine",
                "habits": [
                    "strongness<9",
                    "style in ['Abbaye','Belgian Pale Ale', 'Lager']",
                    "color in ['Blond', 'Amber', 'Brown']"
                ],
                "id": 5,
                "lastname": "Angegardien",
                "lastvisitDate": "2017-12-21 00:00:00",
                "lastvisitDay": 21,
                "lastvisitMonth": 12,
                "lastvisitYear": 2017,
                "ponderationDays": [
                    0.0,
                    0.0,
                    0.2,
                    0.4,
                    0,
                    0.5,
                    0
                ],
                "registrationDate": "2017-10-09 00:00:00",
                "registrationDay": 9,
                "registrationMonth": 10,
                "registrationYear": 2017,
                "suitableBeers": [
                    {
                        "brand": "Cuv\u00e9e des Trolls",
                        "color": "Blond",
                        "id": 5,
                        "model": "Blonde",
                        "strongness": 7,
                        "style": "Belgian Pale Ale"
                    }
                ],
                "uptakes": [
                    {
                        "beersId": [
                            10,
                            15
                        ],
                        "day": 9,
                        "month": 10,
                        "year": 2017
                    }
                ]
            }
    },

    created: function () {
        let self = this;
        this.ws = new WebSocket("ws://" + window.location.hostname + ":8082");

        this.ws.onopen = function (event) {
            console.log("Websocket connection opened.");
        };
        this.ws.onmessage = function (event) {
            let msg = JSON.parse(event.data);
            //self.updateCustomer(msg);
            self.customer = msg;
        };
        this.ws.onerror = function (event) {
            console.log("Websocket connection error : " + event);
        };
    },

    computed: {}
});
