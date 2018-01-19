/**
 * Created by gwennael.buchet on 06/01/18.
 */

let suitablesitem = Vue.component(
    'suitables-item',
    {
        template: '<div>\n' +
        '            <div class="container">\n' +
        '                <div class="row">\n' +
        '                    <h1>You should like:</h1>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="carousel-reviews broun-block">\n' +
        '                <div class="container">\n' +
        '                    <div class="row">\n' +
        '                        <div id="carousel-reviews" class="carousel slide" data-interval="false" data-ride="carousel">\n' +
        '                            <div class="carousel-inner"> \n' +

        //boucle sur les listes de bières
        '                               <beerslist-item v-for="(beer, index) in beers" v-if="index%4 === 0"' +
        '                                       v-bind:index="index" \n' +
        '                                       v-bind:key="beer.id"' +
        '                                       v-bind:beers="beers.slice(index, index+4)" :showRank="1"></beerslist-item>' +


        '                            </div>\n' +
        '                            <a class="left carousel-control" href="#carousel-reviews" role="button" data-slide="prev">\n' +
        '                                <span class="glyphicon glyphicon-chevron-left"></span>\n' +
        '                            </a>\n' +
        '                            <a class="right carousel-control" href="#carousel-reviews" role="button" data-slide="next">\n' +
        '                                <span class="glyphicon glyphicon-chevron-right"></span>\n' +
        '                            </a>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>',

        props: ['beers']
    }
);