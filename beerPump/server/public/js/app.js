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

        fetch("http://localhost:8092/beers", {mode: 'cors'})
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.beers = data;
            })
            .catch(function (error) {
                console.log('Request fa￼iled', error);
            });

        this.ws = new WebSocket("ws://" + window.location.hostname + ":8082");

        this.ws.onopen = function (event) {
            console.log("Websocket connection opened.");
        };
        this.ws.onmessage = function (event) {
            self.customer = JSON.parse(event.data);
        };
        this.ws.onerror = function (event) {
            console.log("Websocket connection error : " + event);
        };

        fetch("http://localhost:8092/connect",
            {
                mode: 'cors', method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'id=3'
            })
            .then(function (data) {
                console.log(data)
            })
            .catch(function (error) {
                console.log("Cannot connect with customer id 1");
            });
    },

    methods: {
        getBeerFromId: function (id) {
            for (let b of this.beers) {
                if (b.id == id)
                    return b;
            }
            return null;
        }
    }
});
