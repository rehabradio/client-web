var SearchLayout        = require('../views/layout-search'),
    SearchModel         = require('../models/models-search'),
    SearchCollection    = require('../collections/collections-search'),
    ViewSearchForm      = require('../views/view-search-form'),
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

    services: window.services,

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

    initialize: function(query){

        // this.model.set('query', query);

        var Model = Backbone.Model.extend({
            defaults: {
                services: this.services
            }
        });

        this.layout = new SearchLayout({
            model: new Model(),
            regions: {
                // results: '#results',
                searchForm: '#search-form',
                modalContainer : '#search-modal-container'
            }
        });
        
        var regions = {};
        
        for(var i in this.services){
            regions[this.services[i]] = '#' + this.services[i];
        }       

        this.layout.addRegions(regions);

        if(!dataStore.searchCollections){

            dataStore.searchCollections = {};

            _.each(this.services, function(element, index){
                dataStore.searchCollections[element] = new SearchCollection([], {
                    service: element
                });
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

        var viewSearchForm = new ViewSearchForm();

        this.listenTo(viewSearchForm, 'search:search', this.performSearch);

        this.layout.searchForm.show(viewSearchForm);

        for(var i in this.services){
            this.layout[this.services[i]].show(this.createService(this.services[i]));

        }

        this.performSearch();
    },

    createService: function(service){

        var Model = Backbone.Model.extend();

        var searchService = new searchServiceView({
            model: new Model({service: service}),
            collection: dataStore.searchCollections[service], 
            className: service
        });

        this.layout.listenTo(searchService, 'childview:search:queues:add', this._onAddToQueue.bind(this));
        this.layout.listenTo(searchService, 'childview:search:playlists:add', this._onAddToPlaylist.bind(this));

        return searchService;
    },

    onBeforeDestroy: function(){

        /*
         *  TODO remove service views
         */

    },

    _onAddToQueue: function(view){

        /*
         *  Trigger the 'add-to-queue' modal, create an xhr object and pass it as the request param.
         */


        var Model = Backbone.Model.extend({});

        this.modalAddQueue = new this.modals.queues.addTrack({
            request: API.Meta.addTrack(view.model.attributes),
            collection: dataStore.queuesCollection
        });

        this.layout.modalContainer.show(this.modalAddQueue);
        this.layout.listenTo(this.modalAddQueue, 'queues:tracks:add', API.Queues.addTrackToQueue, this);

    },

    _onAddToPlaylist:function(view){

        /*
         *  Add the track to the meta data before opening the add-to-playlist modal. The function to open the modal is triggered by the ajax promise callback 
         */

        var Model = Backbone.Model.extend();

        this.modalAddPlaylist = new this.modals.playlists.addTrack({
            request: API.Meta.addTrack(view.model.attributes),
            collection: dataStore.playlistsCollection
            // model: new Model({track: response.id})
        });

        this.layout.modalContainer.show(this.modalAddPlaylist);
        this.layout.listenTo(this.modalAddPlaylist, 'playlist:tracks:add', API.Playlists.addTrackToPlaylist, this);
       // API.Meta.addTrack(view.model.attributes, this.createPlaylistModal.bind(this) );

    },


    showLayout: function(service){
        this.layout.results.show(this.createService(service));
    }, 

    performSearch: function(){

        var query = this._getQuery();


        if(query.length > 0){

            _.each(dataStore.searchCollections, function(element){
                element.reset();
                element.fetch();
            });
        }
    },

    _getQuery: function(){

        var query = '',
            searchParams = location.search.replace('?', '').split('&'),
            params = {};

        for(var i in searchParams){
            params[searchParams[i].split('=')[0]] = searchParams[i].split('=')[1];
        }

        if(params.query){
            query = params.query;
        }

        return query;

    }
});