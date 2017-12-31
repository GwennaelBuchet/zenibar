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

	// We want to target the div with an id of 'drinkersList'
	el: '#wrapper',

	data: {
		ws: null, // Our websocket
		drinkers: [
			{
				"name": "Gwen",
				"quantity": 0,
				"email": "gwennael.buchet@gmail.com",
				"platforms": [
					{
						"name": "",
						"quantity": 0
					}
				]
			},
			{
				"name": "Adrien",
				"quantity": 0,
				"email": "adrien.legrand@zenika.com",
				"platforms": [
					{
						"name": "",
						"quantity": 0
					}]
			}
		]
	},

	created: function () {
		let self = this;
		this.ws = new WebSocket("ws://" + window.location.hostname + ":8081");

		this.ws.onopen = function (event) {
			console.log("Websocket connection opened.");
		};
		this.ws.onmessage = function (event) {
			let msg = JSON.parse(event.data);
			self.addQuantityToDrinker(msg);
		};
		this.ws.onerror = function (event) {
			console.log("Websocket connection error : " + event);
		};
	},

	methods: {
		addQuantityToDrinker: function (message) {

			let drinker = this._getDrinkerByName(message.name);
			drinker.quantity = (message.quantity > drinker.quantity) ? message.quantity : drinker.quantity;
			drinker.platforms = message.platforms;
			//this._setPlatformQuantityByDrinkerAndName(message.name, message.platform, message.quantity);
		},
	},

	computed: {}
});
