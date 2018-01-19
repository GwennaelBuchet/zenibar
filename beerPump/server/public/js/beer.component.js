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
        '        <div v-if="showRank > 0" class="mark">Matching: \n' +
        '            <span class="rating-input">\n' +
        '                <span data-value="0" class="glyphicon glyphicon-star"></span>\n' +
        '                <span data-value="1" class="glyphicon" v-bind:class="{\'glyphicon-star\':beer.rank>=1, \'glyphicon-star-empty\':beer.rank<1}""></span>\n' +
        '                <span data-value="2" class="glyphicon" v-bind:class="{\'glyphicon-star\':beer.rank>=2, \'glyphicon-star-empty\':beer.rank<2}"></span>\n' +
        '                <span data-value="3" class="glyphicon" v-bind:class="{\'glyphicon-star\':beer.rank>=3, \'glyphicon-star-empty\':beer.rank<3}"></span>\n' +
        '                <span data-value="4" class="glyphicon" v-bind:class="{\'glyphicon-star\':beer.rank>=4, \'glyphicon-star-empty\':beer.rank<4}"></span>\n' +
        '                <span data-value="5" class="glyphicon" v-bind:class="{\'glyphicon-star\':beer.rank>=5, \'glyphicon-star-empty\':beer.rank<5}"></span>\n' +
        '            </span>\n' +
        '        </div>\n' +
        '        <p>{{beer.strongness}}° | {{beer.style}}</p>\n' +
        '        <p>{{beer.price}} €</p>\n' +
        '    <h1 class="panel-title panel-title-landing"> \n' +
        '        <span class="btn btn-price" style="font-size: 1.1em" v-on:click="orderBeer()" v-bind:class="{selectedBeer:beer.isSelected === true}">{{beer.isSelected?"Sélectionné":"Sélectionner"}}</span> \n' +
        '        <span class="badge" :class="{\'badge-secondary\':beer.stock>=3, \'badge-danger\':beer.stock<3}">{{beer.stock}}</span>\n' +
        '    </h1>' +
        '        <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '    </div>\n' +
        '    <div class="person-text rel">\n' +
        '        <img :src="pictureURL(beer.brand, beer.model)" width="79px" height="152px"/>\n' +
        '        <div><i>{{beer.origin}}</i></div>\n' +
        '    </div>\n' +
        '</div> \n',

        props: ['beer', 'index', 'showRank'],

        methods: {
            pictureURL: function (brand, model) {
                return "http://localhost:8090/pictures/beers/" + brand + "_" + model + ".jpg";
            },

            updateComponent:function() {
                this.$forceUpdate();
            },

            orderBeer: function (event) {
                console.log("history order: " + this.beer.id);

                this.$parent.$parent.$parent.orderNewBeer(this.beer.id);

                this.updateComponent();

                setInterval(this.updateComponent, 500);
            }
        }
    }
);