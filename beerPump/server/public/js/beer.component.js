/**
 * Created by gwennael.buchet on 06/01/18.
 */

let beeritem = Vue.component(
    'beer-item',
    {
        template:
        '<div class="col-md-3 col-sm-4" v-bind:class="{\'hidden-xs\': index===0, \'hidden-sm\': index===2 || index===3}">\n' +
        '    <div class="block-text rel zmin">\n' +
        '        <a title="" href="#">{{beer.brand}} {{beer.model}}</a>\n' +
        '        <div class="mark">Matching: \n' +
        '            <span class="rating-input">\n' +
        '                <span data-value="0" class="glyphicon glyphicon-star"></span>\n' +
        '                <span data-value="1" class="glyphicon glyphicon-star"></span>\n' +
        '                <span data-value="2" class="glyphicon glyphicon-star-empty"></span>\n' +
        '                <span data-value="3" class="glyphicon glyphicon-star-empty"></span>\n' +
        '                <span data-value="4" class="glyphicon glyphicon-star-empty"></span>\n' +
        '                <span data-value="5" class="glyphicon glyphicon-star-empty"></span>\n' +
        '            </span>\n' +
        '        </div>\n' +
        '        <p>Alcool: {{beer.strongness}}°</p>\n' +
        '        <p>Style: {{beer.style}}</p>\n' +
        '    <h1 class="panel-title panel-title-landing" > \n' +
        '        <span class="btn btn-price" style="font-size: 1.1em" v-on:click="orderBeer">Order</span> \n' +
        '    </h1>' +
        '        <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '    </div>\n' +
        '    <div class="person-text rel">\n' +
        '        <img :src="pictureURL(beer.brand, beer.model)" width="79px" height="152px"/>\n' +
        '        <div><i>{{beer.origin}}</i></div>\n' +
        '    </div>\n' +
        '</div> \n',

        props: ['beer', 'index'],

        methods: {
            pictureURL: function (brand, model) {
                return "http://localhost:8090/pictures/beers/" + brand + "_" + model + ".jpg";
            },

            orderBeer: function (event) {
                console.log("history order: "+ this.beer.id);
                this.$parent.$parent.$parent.orderNewBeer(this.beer.id);
            }
        }
    }
);