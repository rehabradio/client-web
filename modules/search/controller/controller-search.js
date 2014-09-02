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

    initialize: function(query){

        this.model.set('query', query);

        this.layout = new SearchLayout({
            // defaultService: this.defaultService,
            regions: {
                results: '#results',
                modalContainer : '#search-modal-container'
            }
        });

        if(!dataStore.searchCollections){

            dataStore.searchCollections = {};

            _.each(this.services, function(element, index){
                dataStore.searchCollections[element] = new SearchCollection();
            });
        }

        this.listenTo(this.layout, 'show', this.onShow);
        this.listenTo(this.layout, 'before:destroy', this.onBeforeDestroy);
    },

    show: function(){

        /*
         *  Return search layout view
         */
        
        return this.layout;
    },

    onShow: function(){

        this.listenTo(this.layout, 'search:service:change', this.showLayout);

        if(this.model.get('query') && this.model.get('query').length > 0){
            this.performSearch();
        }

        this.layout.results.show(this.createService(this.defaultService));
    },

    createService: function(service){

        var self = this;

        var searchService = new searchServiceView({
            collection: dataStore.searchCollections[service], 
            className: service
        });

        self.layout.listenTo(searchService, 'childview:search:queues:add', self._onAddToQueue.bind(self));
        self.layout.listenTo(searchService, 'childview:search:playlists:add', self._onAddToPlaylist.bind(self));

        return searchService;
    },

    onBeforeDestroy: function(){

        /*
         *  TODO remove service views
         */

    },

    _onAddToQueue: function(view){

        /*
         *  Add the track to the meta data before opening the add-to-queue modal. The function to open the modal is triggered by the ajax promise callback 
         */

        API.Meta.addTrack(view.model.attributes, this.createQueueModal.bind(this) );
    },

    _onAddToPlaylist:function(view){

        /*
         *  Add the track to the meta data before opening the add-to-playlist modal. The function to open the modal is triggered by the ajax promise callback 
         */

       API.Meta.addTrack(view.model.attributes, this.createPlaylistModal.bind(this) );

    },

    createQueueModal: function(response){

        var Model = Backbone.Model.extend({});

        this.modalAddQueue = new this.modals.queues.addTrack({
            collection: dataStore.queuesCollection,
            model: new Model({track: response.id})
        });

        this.layout.modalContainer.show(this.modalAddQueue);
        this.layout.listenTo(this.modalAddQueue, 'queues:tracks:add', API.Queues.addTrackToQueue, this);
    },

    createPlaylistModal:function(response){

        var Model = Backbone.Model.extend({});

        this.modalAddPlaylist = new this.modals.playlists.addTrack({
            collection: dataStore.playlistsCollection,
            model: new Model({track: response.id})
        });

        this.layout.modalContainer.show(this.modalAddPlaylist);
        this.layout.listenTo(this.modalAddPlaylist, 'playlist:tracks:add', API.Playlists.addTrackToPlaylist, this);

    },


    showLayout: function(service){
        this.layout.results.show(this.createService(service));
    }, 

    fetchServices: function(query, service, cb){
        var xhr = dataStore.searchCollections[service].fetch({service:service, query:query});
        // xhr.done( cb );
    },

    performSearch: function(){

        _.each(dataStore.searchCollections, function(element){
            element.reset();
        });

        var query = this.model.get('query');

        _.each(this.services, function(service){
            this.fetchServices(query, service);
        }, this);

    }
});