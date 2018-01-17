/**
 * Created by gwennael.buchet on 06/01/18.
 */

let historyitem = Vue.component(
    'history-item',
    {
        template: '\
		<div class="container"> \
			<h1>Account: {{ (customer.amount).toFixed(2) }}€ left</h1>\
			<div class="row text-center"> \
				<div class="col-md-12" style="margin-top: 5px;"> \
					<div class="pricing-table"> \
						<div class="panel panel-primary" style="border: none;"> \
							<div class="controle-header panel-heading panel-heading-landing"> \
								<h1 class="panel-title panel-title-landing" > \
									Your last order \
								</h1> \
							</div> \
							<div class="panel-body panel-body-landing parent-header"> \
								<div><img :src="pictureURL(lastBeer.brand, lastBeer.model)" width="79px" height="152px"></div> \
								<div>\
								    <div class="lastbeer-desc" style="font-weight: bolder">{{lastBeer.brand}} {{lastBeer.model}} ({{lastBeer.strongness}}°) </div>\
								    <div class="mark">\
                                        <span class="rating-input">\
                                            <span data-value="0" class="glyphicon glyphicon-star"></span>\
                                            <span data-value="1" class="glyphicon" v-bind:class="{\'glyphicon-star\':lastBeer.rank>=1, \'glyphicon-star-empty\':lastBeer.rank<1}""></span>\
                                            <span data-value="2" class="glyphicon" v-bind:class="{\'glyphicon-star\':lastBeer.rank>=2, \'glyphicon-star-empty\':lastBeer.rank<2}"></span>\
                                            <span data-value="3" class="glyphicon" v-bind:class="{\'glyphicon-star\':lastBeer.rank>=3, \'glyphicon-star-empty\':lastBeer.rank<3}"></span>\
                                            <span data-value="4" class="glyphicon" v-bind:class="{\'glyphicon-star\':lastBeer.rank>=4, \'glyphicon-star-empty\':lastBeer.rank<4}"></span>\
                                            <span data-value="5" class="glyphicon" v-bind:class="{\'glyphicon-star\':lastBeer.rank>=5, \'glyphicon-star-empty\':lastBeer.rank<5}"></span>\
                                        </span>\
                                    </div>\
                                            <div class="lastbeer-desc">{{lastBeer.style}}</div>\
                                            <div class="lastbeer-desc">Color: {{lastBeer.color}}</div>\
                                            <div class="lastbeer-desc">Origin: {{lastBeer.origin}}</div>\
                                        </div>\
                                    </div> \
                                    <div class="panel-footer panel-footer-landing">\
                                        <h1 class="panel-title panel-title-landing" > \
                                            <span class="btn btn-price" style="font-size:1.1em" v-on:click="orderBeer">Select</span> \
                                            <span class="badge" :class="{\'badge-secondary\':lastBeer.stock>=3, \'badge-danger\':lastBeer.stock<3}">{{lastBeer.stock}}</span>\
                                        </h1> \
                                    </div>\
                                </div> \
                            </div> \
                        </div> \
                    </div> \
                </div>',

        props: ['customer', 'beers', 'lastuptake'],
        watch: {
            lastuptake: function (newVal, oldVal) { // watch it
                console.log('Prop changed: ', newVal, ' | was: ', oldVal)
                this.updateLastBeer();
            }
        },

        data: function () {
            return {
                lastBeer: {}
            }
        },

        created: function () {
            this.updateLastBeer();
        },

        methods: {
            pictureURL: function (brand, model) {
                return "http://localhost:8090/pictures/beers/" + brand + "_" + model + ".jpg";
            },

            updateLastBeer: function () {
                let lastBeerId = this.lastuptake.beersId[this.lastuptake.beersId.length - 1];

                this.lastBeer = this.getBeerFromId(lastBeerId);
            },

            getBeerFromId: function (id) {
                for (let b of this.beers) {
                    if (b.id == id)
                        return b;
                }
                return null;
            },

            orderBeer: function (event) {
                console.log("history order: " + this.customer.id + " ; " + this.lastBeer.id);
                this.$parent.orderNewBeer(this.lastBeer.id);
            }
        }
    }
)