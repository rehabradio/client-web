var Layout 				= require('../views/layout/layout'),
	SearchCollection	= require('../collections/collections-search'),
    searchView          = require('../views/view-search'),
    searchServiceView   = require('../views/view-search-service');

/*

Contains logic for instaniating views, 

fetching data from collections.
Layout Logic, switching views.

The views will be destroyed and one result set will be in the dom at any given time.
Collection data will still be present within the controller

*/

var API = require('../../../js/src/utils/api');

var SearchController = Marionette.Controller.extend({

	services: [
		'spotify',
		'soundcloud'
	],

	collections: {},

	defaultService: 'spotify',

    modals: {
        queues: {
            addTrack : require('../../core/modals/views/modal-queues-add-track')
        },
        playlists: {
            addTrack : require('../../core/modals/views/modal-playlists-add-track'),
            create : require('../../core/modals/views/modal-playlists-create'),
            remove : require('../../core/modals/views/modal-playlists-delete')
        }
    },

    initialize: function(){
        this.layout = new Layout({defaultService: this.defaultService });
        this.layout.render();
        this.bootCollections();
        this.setUpListeners();
        new searchView();
    },

    _onAddToQueue:function(model){

        //post source_id, source_type to meta to retrieve a valid id
        API.Meta.addTrack(model.attributes, _.bind(this.createModal, this) );

    },

    createModal:function(response){

        console.log('successfully saved...', response);

        var Model = Backbone.Model.extend({}),
        id = response.id;

        this.modalAddQueue = new this.modals.queues.addTrack({
            collection: dataStore.queuesCollection,
            model: new Model({track: id })
        });

        this.renderModal();
    },

    renderModal:function(){
        this.layout.modalContainer.show(this.modalAddQueue);
        this.layout.listenTo(this.modalAddQueue, 'queues:tracks:add', API.Queues.addTrackToQueue, this);
    },  
    
    setUpListeners:function(){
        this.listenTo(dispatcher, 'search:onAddToQueue', this._onAddToQueue, this);
        this.listenTo(dispatcher, 'perform-search', this.performSearch, this);
        this.listenTo(dispatcher, 'service:switch', this.showLayout, this);
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