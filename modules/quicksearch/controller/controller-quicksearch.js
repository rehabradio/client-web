/**
* The Quicksearch module allows the user to see results based on the users query as they are typing. It loads three reuslts for each of 
* the search services available.
*
* @module Quicksearch
* @constructor
* @event quicksearch#search
*/

var BaseContoller   = require('../../core/controller/base-controller');
var BaseCollection   = require('../../core/base-collection');

var API = require('../../../js/src/utils/api');

var CollectionQuicksearchResults = require('../collections/collection-quicksearch-results');
var ViewQuicksearchResults = require('../views/view-quicksearch-results');

var LayoutQuicksearch = require('../views/layout-quicksearch');
var LayoutQuicksearchResults = require('../views/layout-quicksearch-results');
var ViewQuicksearchQuery = require('../views/view-quicksearch-query');
var ModelQuicksearchResults = require('../models/model-quicksearch-results');

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

            modelQuicksearchResults = new ModelQuicksearchResults({service: this.services[i]});

            viewsServices[this.services[i]] = new ViewQuicksearchResults({model: modelQuicksearchResults, collection: this.collectionsServices[this.services[i]]});

            var region = {}
            region[this.services[i]] = '#search-service-' + this.services[i];

            layoutQuicksearchResults.addRegions(region);
        }

        var quicksearchQuery = new ViewQuicksearchQuery();

        this.layout.quicksearchQuery.show(quicksearchQuery);
        this.layout.quicksearchResults.show(layoutQuicksearchResults);

        for(var i in this.services){
            layoutQuicksearchResults[this.services[i]].show(viewsServices[this.services[i]]);
        }

        this.listenTo(quicksearchQuery, 'quicksearch:search', this._doSearch.bind(this));
        this.listenTo(quicksearchQuery, 'quicksearch:setactive', this._setActive.bind(this));

    },

    _doSearch: function(query){

        for(var i in this.collectionsServices){
            this.collectionsServices[i].update(query);
        }
    },

    _setActive: function(){
        this.layout.$el.addClass('active');
    }
});