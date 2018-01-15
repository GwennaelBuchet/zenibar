/**
 * Created by gwennael.buchet on 06/01/18.
 */

let beersitem = Vue.component(
    'beers-item',
    {
        /*template: '\
		<header id="header">\n' +
        '    <h1>All beers</h1>\n' +
        '    <ul>\n' +
        '        <li is="beer-item" \n' +
        '            v-for="beer in beers" \n' +
        '            v-bind:beer="beer" \n' +
        '        ></li> \n' +
        '    </ul> \n' +
        '</header>',*/


        template:'<div> <div class="container">\n' +
        '  <div class="row">\n' +
        '    <h2>Recommandations:</h2>\n' +
        '  </div>\n' +
        '</div>\n' +
        '<div class="carousel-reviews broun-block">\n' +
        '    <div class="container">\n' +
        '        <div class="row">\n' +
        '            <div id="carousel-reviews" class="carousel slide" data-ride="carousel">\n' +
        '            \n' +
        '                <div class="carousel-inner">\n' +
        '                    <div class="item active">\n' +
        '                      <div class="col-md-4 col-sm-6">\n' +
        '                    <div class="block-text rel zmin">\n' +
        '                    <a title="" href="#">Hercules</a>\n' +
        '                  <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>\n' +
        '                    <p>Never before has there been a good film portrayal of ancient Greece\'s favourite myth. So why would Hollywood start now? This latest attempt at bringing the son of Zeus to the big screen is brought to us by X-Men: The last Stand director Brett Ratner. If the name of the director wasn\'t enough to dissuade ...</p>\n' +
        '                  <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '                  </div>\n' +
        '              <div class="person-text rel">\n' +
        '                        <img src="http://localhost:8090/pictures/beers/Angelus_Blonde.jpg"/>\n' +
        '                <a title="" href="#">Anna</a>\n' +
        '                <i>from Glasgow, Scotland</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '                  <div class="col-md-4 col-sm-6 hidden-xs">\n' +
        '                <div class="block-text rel zmin">\n' +
        '                    <a title="" href="#">The Purge: Anarchy</a>\n' +
        '                  <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star-empty"></span><span data-value="3" class="glyphicon glyphicon-star-empty"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>\n' +
        '                    <p>The 2013 movie "The Purge" left a bad taste in all of our mouths as nothing more than a pseudo-slasher with a hamfisted plot, poor pacing, and a desperate attempt at "horror." Upon seeing the first trailer for "The Purge: Anarchy," my first and most immediate thought was "we really don\'t need another one of these."  </p>\n' +
        '                      <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '                    </div>\n' +
        '              <div class="person-text rel">\n' +
        '                        <img src="http://localhost:8090/pictures/beers/Barbar_Miel.jpg"/>\n' +
        '                    <a title="" href="#">Ella Mentree</a>\n' +
        '                <i>United States</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="col-md-4 col-sm-6 hidden-sm hidden-xs">\n' +
        '              <div class="block-text rel zmin">\n' +
        '                <a title="" href="#">Planes: Fire & Rescue</a>\n' +
        '                <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star"></span><span data-value="5" class="glyphicon glyphicon-star"></span>  </span></div>\n' +
        '                  <p>What a funny and entertaining film! I did not know what to expect, this is the fourth film in this vehicle\'s universe with the two Cars movies and then the first Planes movie. I was wondering if maybe Disney pushed it a little bit. However, Planes: Fire and Rescue is an entertaining film that is a fantastic sequel in this magical franchise. </p>\n' +
        '                <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '              </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img src="http://localhost:8090/pictures/beers/Chimay_Bleue.jpg"/>\n' +
        '                <a title="" href="#">Rannynm</a>\n' +
        '                <i>Indonesia</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '                    </div>\n' +
        '                    <div class="item">\n' +
        '                        <div class="col-md-4 col-sm-6">\n' +
        '                    <div class="block-text rel zmin">\n' +
        '                    <a title="" href="#">Hercules</a>\n' +
        '                  <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>\n' +
        '                    <p>Never before has there been a good film portrayal of ancient Greece\'s favourite myth. So why would Hollywood start now? This latest attempt at bringing the son of Zeus to the big screen is brought to us by X-Men: The last Stand director Brett Ratner. If the name of the director wasn\'t enough to dissuade ...</p>\n' +
        '                  <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '                  </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img alt="" src="http://localhost:8090/pictures/beers/Delirium_Tremens.jpg">\n' +
        '                <a title="" href="#">Anna</a>\n' +
        '                <i>from Glasgow, Scotland</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '                  <div class="col-md-4 col-sm-6 hidden-xs">\n' +
        '                <div class="block-text rel zmin">\n' +
        '                    <a title="" href="#">The Purge: Anarchy</a>\n' +
        '                  <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star-empty"></span><span data-value="3" class="glyphicon glyphicon-star-empty"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>\n' +
        '                    <p>The 2013 movie "The Purge" left a bad taste in all of our mouths as nothing more than a pseudo-slasher with a hamfisted plot, poor pacing, and a desperate attempt at "horror." Upon seeing the first trailer for "The Purge: Anarchy," my first and most immediate thought was "we really don\'t need another one of these."  </p>\n' +
        '                      <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '                    </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img alt="" src="http://localhost:8090/pictures/beers/Hinano_.jpg">\n' +
        '                    <a title="" href="#">Ella Mentree</a>\n' +
        '                <i>United States</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="col-md-4 col-sm-6 hidden-sm hidden-xs">\n' +
        '              <div class="block-text rel zmin">\n' +
        '                <a title="" href="#">Planes: Fire & Rescue</a>\n' +
        '                <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star"></span><span data-value="5" class="glyphicon glyphicon-star"></span>  </span></div>\n' +
        '                  <p>What a funny and entertaining film! I did not know what to expect, this is the fourth film in this vehicle\'s universe with the two Cars movies and then the first Planes movie. I was wondering if maybe Disney pushed it a little bit. However, Planes: Fire and Rescue is an entertaining film that is a fantastic sequel in this magical franchise. </p>\n' +
        '                <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '              </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img alt="" src="http://localhost:8090/pictures/beers/Gulden_Draak.jpg">\n' +
        '                <a title="" href="#">Rannynm</a>\n' +
        '                <i>Indonesia</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '                    </div>\n' +
        '                    <div class="item">\n' +
        '                        <div class="col-md-4 col-sm-6">\n' +
        '                    <div class="block-text rel zmin">\n' +
        '                    <a title="" href="#">Hercules</a>\n' +
        '                  <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>\n' +
        '                    <p>Never before has there been a good film portrayal of ancient Greece\'s favourite myth. So why would Hollywood start now? This latest attempt at bringing the son of Zeus to the big screen is brought to us by X-Men: The last Stand director Brett Ratner. If the name of the director wasn\'t enough to dissuade ...</p>\n' +
        '                  <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '                  </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img alt="" src="http://localhost:8090/pictures/beers/Kwak_.jpg">\n' +
        '                <a title="" href="#">Anna</a>\n' +
        '                <i>from Glasgow, Scotland</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '                  <div class="col-md-4 col-sm-6 hidden-xs">\n' +
        '                <div class="block-text rel zmin">\n' +
        '                    <a title="" href="#">The Purge: Anarchy</a>\n' +
        '                  <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star-empty"></span><span data-value="3" class="glyphicon glyphicon-star-empty"></span><span data-value="4" class="glyphicon glyphicon-star-empty"></span><span data-value="5" class="glyphicon glyphicon-star-empty"></span>  </span></div>\n' +
        '                    <p>The 2013 movie "The Purge" left a bad taste in all of our mouths as nothing more than a pseudo-slasher with a hamfisted plot, poor pacing, and a desperate attempt at "horror." Upon seeing the first trailer for "The Purge: Anarchy," my first and most immediate thought was "we really don\'t need another one of these."  </p>\n' +
        '                      <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '                    </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img alt="" src="http://localhost:8090/pictures/beers/La Levrette_Blonde.jpg">\n' +
        '                    <a title="" href="#">Ella Mentree</a>\n' +
        '                <i>United States</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="col-md-4 col-sm-6 hidden-sm hidden-xs">\n' +
        '              <div class="block-text rel zmin">\n' +
        '                <a title="" href="#">Planes: Fire & Rescue</a>\n' +
        '                <div class="mark">My rating: <span class="rating-input"><span data-value="0" class="glyphicon glyphicon-star"></span><span data-value="1" class="glyphicon glyphicon-star"></span><span data-value="2" class="glyphicon glyphicon-star"></span><span data-value="3" class="glyphicon glyphicon-star"></span><span data-value="4" class="glyphicon glyphicon-star"></span><span data-value="5" class="glyphicon glyphicon-star"></span>  </span></div>\n' +
        '                  <p>What a funny and entertaining film! I did not know what to expect, this is the fourth film in this vehicle\'s universe with the two Cars movies and then the first Planes movie. I was wondering if maybe Disney pushed it a little bit. However, Planes: Fire and Rescue is an entertaining film that is a fantastic sequel in this magical franchise. </p>\n' +
        '                <ins class="ab zmin sprite sprite-i-triangle block"></ins>\n' +
        '              </div>\n' +
        '              <div class="person-text rel">\n' +
        '                <img alt="" src="http://localhost:8090/pictures/beers/Orval_Blonde.jpg">\n' +
        '                <a title="" href="#">Rannynm</a>\n' +
        '                <i>Indonesia</i>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '                    </div>                    \n' +
        '                </div>\n' +
        '                <a class="left carousel-control" href="#carousel-reviews" role="button" data-slide="prev">\n' +
        '                    <span class="glyphicon glyphicon-chevron-left"></span>\n' +
        '                </a>\n' +
        '                <a class="right carousel-control" href="#carousel-reviews" role="button" data-slide="next">\n' +
        '                    <span class="glyphicon glyphicon-chevron-right"></span>\n' +
        '                </a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div> \n'+
        '</div>',

        props: ['beers']
    }
);