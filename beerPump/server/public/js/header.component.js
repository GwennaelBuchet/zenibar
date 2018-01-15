/**
 * Created by gwennael.buchet on 06/01/18.
 */

let headeritem = Vue.component(
    'header-item',
    {
        template: '\
		<header id="header">\n' +
        '        <img :src="pictureURL(customer.firstname, customer.lastname)" class="gravatar"> \n' +
        '        <h1>Hello {{customer.firstname}} !</h1>\n' +
        '        <h2>Welcome to Zenibar !</h2>\n' +
        '        <ul class="icons">\n' +
        '            <li><a href="#" class="icon style2 fa-beer"><span class="label">Beer</span></a></li>\n' +
        '            <li><a href="#" class="icon fa-long-arrow-right"><span class="label"></span></a></li>\n' +
        '            <li><a href="#" class="icon style2 fa-plug"><span class="label">Connected</span></a></li>\n' +
        '            <li><a href="#" class="icon fa-long-arrow-left"><span class="label"></span></a></li>\n' +
        '            <li><a href="#" class="icon style2 fa-glass"><span class="label">Drink</span></a></li>\n' +
        '        </ul>\n' +
        '    </header>',

        props: ['customer'],

        methods: {
            pictureURL: function (firstname, lastname) {
                return "http://localhost:8090/pictures/customers/" + firstname + "_" + lastname + ".jpg";
            }
        }
    }
);