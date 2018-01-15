/**
 * Created by gwennael.buchet on 06/01/18.
 */

let historyitem = Vue.component(
    'history-item',
    {
        template: '\
		<div class="container"> \
			<div class="row text-center"> \
				<div class="col-md-12" style="margin-top: 5px;"> \
					<div class="pricing-table"> \
						<div class="panel panel-primary" style="border: none;"> \
							<div class="controle-header panel-heading panel-heading-landing"> \
								<h1 class="panel-title panel-title-landing" > \
									Your last order \
								</h1> \
							</div> \
							<div class="panel-body panel-body-landing"> \
								<img :src="pictureURL(lastBeer.brand, lastBeer.model)" width="79px" height="152px"> \
								<span>{{lastBeer.brand}} {{lastBeer.model}} ({{lastBeer.strongness}}°) </span>\
							</div> \
							<div class="panel-footer panel-footer-landing">\
                                <h1 class="panel-title panel-title-landing" > \
                                    <span class="btn btn-price">Reorder</span> \
                                </h1> \
							</div>\
						</div> \
					</div> \
				</div> \
			</div> \
		</div>',

        props: ['customer', 'beers', 'lastuptake'],

        data: function () {
            return {
                lastBeer: {}
            }
        },

        created: function () {
            let lastBeerId = this.lastuptake.beersId[this.lastuptake.beersId.length - 1];

            this.lastBeer = this.getBeerFromId(lastBeerId);
        },

        methods: {
            pictureURL: function (brand, model) {
                return "http://localhost:8090/pictures/beers/" + brand + "_" + model + ".jpg";
            },

            getBeerFromId: function (id) {
                for (let b of this.beers) {
                    if (b.id == id)
                        return b;
                }
                return null;
            }
        }
    }
);