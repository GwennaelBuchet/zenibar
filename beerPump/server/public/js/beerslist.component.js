/**
 * Created by gwennael.buchet on 06/01/18.
 */

let beerslistitem = Vue.component(
    'beerslist-item',
    {


        template:
        '<div class="item" v-bind:class="{ active: index===0 }">\n' +
        '    <beer-item is="beer-item" v-for="(beer, index) in beers"' +
        '               v-bind:index="index" \n' +
        '               v-bind:key="beer.id" \n' +
        '               v-bind:beer="beer"> \n' +
        '    </beer-item> \n' +
        '</div> \n',

        props: ['beers', 'index']
    }
);