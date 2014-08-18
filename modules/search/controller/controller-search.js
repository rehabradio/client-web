var Layout 				= require('../views/layout/layout'),
	SearchCollection	= require('../collections/collections-search');

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

	defaultService: 'spotify',

	initialize: function(){

		this.setUpListeners();
		this.layout = new Layout();
		this.layout.render();
		this.bootCollections();
		
		new this.views.searchView();
    },

    bootCollections:function(){
    	_.each(this.services, function(service){
			this.collections[service] = new SearchCollection();
		}, this);
    },

    setUpListeners:function(){
    	dispatcher.on('perform-search', this.performSearch, this);
		dispatcher.on('service:switch', this.showLayout, this);
    },

    showDefaultService:function(service){
    	if(service == this.defaultService){
    		this.showLayout(service);
    	}
    },

    showLayout:function(service){
    	this.layout.results.show( new this.views.searchService({
    		collection: this.collections[service], 
    		className: service 
    	}) );
    },

    fetchServices:function(query, service, callback){
        
    	var xhr = this.collections[service].fetch({service:service, query:query});
    	xhr.done( callback );
    },

    performSearch:function(query){
    	_.each(this.services, function(service){
    		this.fetchServices(query, service, function(){
    			this.showDefaultService(service);
    		}.bind(this) );
    	}, this);

	}
});

module.exports = SearchController;