var Layout 				= require('./views/layout/layout'),
	SearchCollection	= require('./collections/collections-search'),
    searchView          = require('./views/view-search'),
    searchServiceView   = require('./views/view-search-service');

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

	collections: {},

	defaultService: 'spotify',

    initialize: function(){
        this.layout = new Layout({defaultService: this.defaultService });
        this.layout.render();
        this.bootCollections();
        this.setUpListeners();
        new searchView();
    },
    
    setUpListeners:function(){
        
        this.listenTo(dispatcher, 'search:perform:search', this.performSearch, this);  
        this.listenTo(dispatcher, 'search:service:switch', this.showLayout, this);

    },

    bootCollections:function(){
    	_.each(this.services, function(service){
			this.collections[service] = new SearchCollection();
		}, this);
    },

    showDefaultService:function(service){
    	if(service == this.defaultService){
    		this.showLayout(service);
    	}
    },

    showLayout:function(service){
    	this.layout.results.show( new searchServiceView({
    		collection: this.collections[service], 
    		className: service 
    	}) );
    },

    fetchServices:function(query, service, cb){
    	var xhr = this.collections[service].fetch({service:service, query:query});
    	xhr.done( cb );
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