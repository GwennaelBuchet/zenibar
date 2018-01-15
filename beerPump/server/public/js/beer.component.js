/**
 * Created by gwennael.buchet on 06/01/18.
 */

let beeritem = Vue.component(
    'beer-item',
    {
        template: '<div> \n' +
        '    <h2>{{beer.brand}} {{beer.model}}</h2>\n' +
        '    <img :src="pictureURL(beer.brand, beer.model)" width="79px" height="152px">\n' +
        '</div>',

        props: ['beer'],

        methods: {
            pictureURL: function (brand, model) {
                return "http://localhost:8090/pictures/beers/" + brand + "_" + model + ".jpg";
            }
        }
    }
);