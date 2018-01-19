/**
 * Created by gwennael.buchet on 06/01/18.
 */

let customeritem = Vue.component(
    'customer-item',
    {
        template: '\
		<div class="container"> \
			<div class="row text-center"> \
				<div class="col-md-12" style="margin-top: 20px;"> \
					<div class="pricing-table"> \
						<div class="panel panel-primary" style="border: none;"> \
							<div class="controle-header panel-heading panel-heading-landing"> \
								<h1 class="panel-title panel-title-landing" > \
									{{customer.firstname}} {{customer.lastname}} \
								</h1> \
							</div> \
							<div class="panel-footer panel-footer-landing"> \
							    <p><img :src="pictureURL(customer.firstname, customer.lastname)" class="gravatar" alt="" /> {{customer.firstname + " " + customer.lastname}}</p>\
							</div> \
							<div>{{customer.amount}} € restant</div>\
						</div> \
					</div> \
				</div> \
			</div> \
		</div>',

        props: ['customer'],

        methods: {
            pictureURL: function (firstname, lastname) {
                //return "http://192.168.43.97:8090/pictures/customers/" + firstname + "_" + lastname + ".jpg";
                return "http://localhost:8090/pictures/customers/" + firstname + "_" + lastname + ".jpg";
            }
        }
    }
);