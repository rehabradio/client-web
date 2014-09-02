var SearchLayout                = require('../views/layout-search'),
    SearchModel         = require('../models/models-search'),
    SearchCollection    = require('../collections/collections-search'),
    searchServiceView   = require('../views/view-search-service');

/*

Contains logic for instaniating views, 

fetching data from collections.
Layout Logic, switching views.

The views will be destroyed and one result set will be in the dom at any given time.
Collection data will still be present within the controller

*/

var API = require('../../../js/src/utils/api');

module.exports = Marionette.Controller.extend({

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

    model: new SearchModel(),

    initialize: function(options){
        this.model.set('query', options.query);

        this.layout = new SearchLayout({
            // defaultService: this.defaultService,
            regions: {
                results: '#results',
                modalContainer : '#search-modal'
            }
        });

        if(!dataStore.searchCollections){

            dataStore.searchCollections = {};

            _.each(this.services, function(element, index){
                dataStore.searchCollections[element] = new SearchCollection();
            });
        }

        this.listenTo(this.layout, 'show', this.onShow);
    },

    show: function(){

        /*
         *  Return search layout view
         */
        
        return this.layout;
    },

    onShow: function(){

        if(this.model.get('query') && this.model.get('query').length > 0){
            this.performSearch();
        }

        var self = this;

        var searchService = new searchServiceView({
            collection: dataStore.searchCollections[self.defaultService], 
            className: self.defaultService
        });

        self.listenTo(self.layout, 'search:service:change', self.showLayout);

        self.layout.results.show(searchService);
    },

 //    _onAddToQueue:function(model){
 //        API.Meta.addTrack(model.attributes, _.bind(this.createQueueModal, this) );
 //    },

 //    _onAddToPlaylist:function(model){

 //        console.log('_onAddToPlaylist');
 //       API.Meta.addTrack(model.attributes, _.bind(this.createPlaylistModal, this) );

 //    },

 //    createQueueModal:function(response){

 //        console.log('successfully saved...', response);

 //        var Model = Backbone.Model.extend({}),
 //        id = response.id;

 //        this.modalAddQueue = new this.modals.queues.addTrack({
 //            collection: dataStore.queuesCollection,
 //            model: new Model({track: id })
 //        });

 //        this.layout.modalContainer.show(this.modalAddQueue);
 //        this.layout.listenTo(this.modalAddQueue, 'queues:tracks:add', API.Queues.addTrackToQueue, this);
 //    },

 //    createPlaylistModal:function(response){
 //        var Model = Backbone.Model.extend({});

 //        this.modalAddPlaylist = new this.models.playlists.addTrack({
 //            collection: dataStore.playlistsCollection,
 //            model: new Model({track: response.track, playlist: response.playlist })
 //        });

 //        this.layout.modalContainer.show(this.modalAddPlaylist);
 //        this.layout.listenTo(this.modalAddPlaylist, 'playlist:tracks:add', API.Playlists.addTrackToPlaylist, this);

 //    },


    showLayout: function(service){
        this.layout.results.show( new searchServiceView({
            collection: dataStore.searchCollections[service], 
            className: service 
        }) );
    }, 

    fetchServices: function(query, service, cb){
        var xhr = dataStore.searchCollections[service].fetch({service:service, query:query});
        // xhr.done( cb );
    },

    performSearch: function(){

        var query = this.model.get('query');

        _.each(this.services, function(service){
            this.fetchServices(query, service);
        }, this);

    }
});