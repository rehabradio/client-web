var BaseContoller   = require('../../core/controller/base-controller');
var BaseCollection   = require('../../core/base-collection');

var API = require('../../../js/src/utils/api');

var CollectionQuicksearchResults = require('../collections/collection-quicksearch-results');
var ViewQuicksearchResults = require('../views/view-quicksearch-results');

var LayoutQuicksearch = require('../views/layout-quicksearch');
var LayoutQuicksearchResults = require('../views/layout-quicksearch-results');
var QuicksearchQuery = require('../views/view-quicksearch-query');

module.exports = BaseContoller.extend({

    services: window.services,

    initialize: function(){

        this.layout = new LayoutQuicksearch({
            regions: {
                'quicksearchQuery': '#quicksearch-query',
                'quicksearchResults': '#quicksearch-results'
            }
        });

        var viewsServices = {};
        this.collectionsServices = {};

        var layoutQuicksearchResults = new LayoutQuicksearchResults();

        for(var i in this.services){

            this.collectionsServices[this.services[i]] = new CollectionQuicksearchResults();
            this.collectionsServices[this.services[i]].service = this.services[i];

            viewsServices[this.services[i]] = new ViewQuicksearchResults({collection: this.collectionsServices[this.services[i]]});

            var region = {}
            region[this.services[i]] = '#search-service-' + this.services[i];

            layoutQuicksearchResults.addRegions(region);
        }

        var quicksearchQuery = new QuicksearchQuery();

        this.layout.quicksearchQuery.show(quicksearchQuery);
        this.layout.quicksearchResults.show(layoutQuicksearchResults);

        for(var i in this.services){
            layoutQuicksearchResults[this.services[i]].show(viewsServices[this.services[i]]);
        }

        this.listenTo(quicksearchQuery, 'quicksearch:search', this._doSearch.bind(this));

    },

    _doSearch: function(query){

        for(var i in this.collectionsServices){
            this.collectionsServices[i].update(query);
        }
    }
});