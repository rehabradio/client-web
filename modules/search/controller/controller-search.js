var Marionette 			= require('backbone.marionette'),
	Layout 				= require('../views/layout/layout'),
	SearchCollection	= require('../collections/collections-search'),
	_					= require('underscore');

/*

Contains logic for instaniating views, 

fetching data from collections.
Layout Logic, switching views.

The views will be destroyed and one result set will be in the dom at any given time.
Collection data will still be present within the controller

*/

var SearchController = Marionette.Controller.extend({

	services: [
		'spotify',
		'soundcloud'
	],

	views: {
		searchView: require('../views/view-search'),
		searchService: require('../views/view-search-service')
	},

	collections: {},

	initialize: function(){

		dispatcher.on('perform-search', this.performSearch, this);
		dispatcher.on('service:switch', this.switchService, this);

		//controller will need to immiately boot up the search view to it can listen for the query in fetch

		console.log('SearchController::initialize');
		this.layout = new Layout();
		this.layout.render();

		_.each(this.services, function(service){
			this.collections[service] = new SearchCollection();
		}, this);

		//boot up search view so we can listen for search terms
		new this.views.searchView();
    },

    performSearch:function(query){

		_.each(this.services, function(service){
			this.collections[service].fetch({service: service, query:query});
		}, this);

		//default view to display when searching

		this.layout.results.show( new this.views.searchService({collection: this.collections.spotify, className: 'spotify' }));

	},

	switchService:function( service ){
		this.layout.results.show( new this.views.searchService({collection : this.collections[service], className:service }) );
	}	

});

module.exports = SearchController;