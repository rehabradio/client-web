
var modelApp = require('../models/models-app'); // Already initialised
var ViewUser = require('./view-user');
var AppLayout = require('../layout/layout');
var AppRouter = require('../../core/router/router');

module.exports = Backbone.View.extend({

	el: '#app',

	model: modelApp,

	children: [],

	//modules that will be started as soon as the app boots
	//maybe move them into core, things like header, sidebar will go here
	coreModules: {
		search: require('../../search/controller/controller-search')
	},

	//views that are called by the router's controller, these views will be displayed within the 
	//layouts 'main' region
	viewModules: {
		queues: require('../../queues/views/view-queues-layout'),
		playlists: require('../../playlists/views/view-playlists-layout')
	},

	initialize: function(){

		 //Store a reference to all appModules
		this.appModules = _.extend(this.coreModules, this.viewModules);

		this.router = new AppRouter();

		

		//Create an overall App Layout and render it
		this.layout = new AppLayout( this );
		this.layout.render();

		var viewUser = new ViewUser();

		this.listenTo(this.model, 'change:loginStatus', function(model){
			if(model.get('loginStatus')){
				this._startApp();
			}
		});

		dispatcher.on('login-set-status', this.setLoginStatus.bind(this));
	},

	setLoginStatus: function(status, user){

		if(!!user){
			this.model.set('url', user.url);
			this.model.set('displayName', user.displayName);
			this.model.set('image', user.image.url);
		}

		this.model.set('loginStatus', status); // Triggers the rerender;
	},

	_startApp: function(){

		console.log('_startApp');

		var self = this;


        self._fetchData();

		/*
		 *	Stores global information for the app. Examples include login information and queue information
		 */

		dataStore.appModel = modelApp;

		this.model = dataStore.appModel;

		console.log('App Initialised');

		/*
		 *	Assign events to the global dispatcher	
		 */

		 // TODO - come up with better event names

		console.log('Creating global events...');

		dispatcher.on('collections-when-pre-loaded', self._startApp.bind(self));

		dispatcher.on('playlist:queue:add', self._addTrackToQueue.bind(self));

		dispatcher.on('playlist:create', self._createPlaylist.bind(self));
		dispatcher.on('playlist:delete', self._deletePlaylist.bind(self));


		dispatcher.on('playlist:track:add', self._addTrackToPlaylist.bind(self));
		dispatcher.on('playlist:track:remove', self._removeTrackFromPlaylist.bind(self));

		dispatcher.on('queue-track-vote', self._voteTrack.bind(self));
		
		dispatcher.on('tracks-collection-reset', self._viewPlaylistTracks.bind(self));

		dispatcher.on('queue:reset', self._queueResetTracks.bind(self));
		dispatcher.on('queue:add', this._queueAdd, this);
		dispatcher.on('queue:track:delete', self._deleteTrackFromQueue.bind(self));


		this.listenTo(dispatcher, 'router:showModule', this._showModule, this);
		//this.listenTo(dispatcher, 'router:triggerController', this._triggerRouterController, this);


		console.log('booting views...');

		Backbone.history.start({ pushState: true, trigger: true });		
		/*
		 *	Callback for when the deferred object is resolved. This loads content needed for the app to function, the queues data and playlists data
		 */

		/*
		 *	Initialise views that don't rely on external data // core modules
		 */

		for(var view in this.coreModules){
			this.children.push( new this.coreModules[view]() );
		}

		this.attachTempClickHandler(); //temporary until its own module is created
	},

	attachTempClickHandler:function(){

		$('#sidebar a').on('click', function(e){
			e.preventDefault();

			var module = $(e.currentTarget).data('name');

			// call the method on the controller directly, not {trigger:true}
			// http://lostechies.com/derickbailey/2011/08/28/dont-execute-a-backbone-js-route-handler-from-your-code/
			// http://media.pragprog.com/titles/dsbackm/sample2.pdf

			switch(module) {

    			case 'playlists':
        			this.router.controller.showPlaylists();
        		break;

    			case 'queues':
        			this.router.controller.showQueues();
        		break;
			}

		}.bind(this));

	},

	_showModule:function( module ){

		this.layout.main.show( new this.viewModules[module]() );
		// this.router.navigate( module );

	},

	//will need to be re-looked at. Should give each module access to the router instead maybe.
	//_triggerRouterController:function( method ){
		//this.router.controller[method]();
	//},	

	_queueAdd:function(payload){

		var self = this;

		var endpoint = 'metadata/tracks/';

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + endpoint,
			data: payload,
			success: function(data){
				self._addTrackToQueue(data.id);
			},
			error: self._onError
		});
	},

	_queueResetTracks: function(id){
		
		/*
		 *	Loads the data for current selected queue
		 */

		dataStore.queueTracksCollection.fetch({
			url: window.API_ROOT + 'queues/' + id + '/tracks/',
			reset: true
		});
	},

	_fetchData: function(){

		/*
		 *	Deferred object to be resolved once data for Playlists and Queue has been loaded
		 */

		/*var deferred = $.Deferred();

		$.when(
			dataStore.playlistsCollection.fetch(),
			dataStore.queuesCollection.fetch()
		).then(function(){
			return deferred.resolve();
		});

		return deferred;*/

		//dont really need to be deferred anymore

		dataStore.playlistsCollection.fetch();
		dataStore.queuesCollection.fetch();
	},

	/*
	 *	Functions to be called when events are triggered from the modules.
	 */

	_viewPlaylistTracks: function(id){

		/*
		 *	Called by clicking on a playlist
		 */

		dataStore.tracksCollection.playlist = id;

		dataStore.tracksCollection.fetch({
			reset: true,
			type: 'GET'
			// add: true,
			// remove: true
		});
	},

	_addTrackToQueue: function(data){

		var endpoint = 'queues/' + data.queue + '/tracks/';

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + endpoint,
			data: {track: data.track},
			success: this._addTrackToQueueSuccess,
			error: this._onError
		});
	},

	_addTrackToQueueSuccess: function(){

		/*
		 *	Callback for a successful call to add track to queue
		 */

		// var collection = _.find(dataStore.queueTracksCollections, function(element){ return element.id === dataStore.appModel.get('queueId'); });

		// collection.fetch({
		// 	// reset: true,
		// 	add: true,
		// 	remove: true
		// });

	},

	_deleteTrackFromQueue: function(model){

		/*
		 *	Deletes the selected track from the queue based on the track_id
		 */

		model.destroy();		 
	},

	_deleteTrackFromQueueSuccess: function(){

		/*
		 *	Callback for a successful call to delete track from queue
		 */

		 dataStore.queuesCollection.fetch({
			add: true,
			remove: true
		});
	},

	_addTrackToPlaylist: function(data){

		/*
		 *	Adds the selected track to the playlist. The data is generated by a function in modules/tracks/views/view-track.js
		 */

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + 'playlists/' + data.playlist + '/tracks/',
			dataType: 'JSON',
			data: {track: data.track},
			success: this._addTrackToPlaylistSuccess,
			error: this._onError
		});
	},

	_addTrackToPlaylistSuccess: function(res){

		/*
		 *	Callback for a successful call to add track to playlist
		 */

		// TODO

		return console.log('Add to playlist success', res);
	},

	_removeTrackFromPlaylist: function(model){

		/*
		 *	Adds the selected track to the playlist. The data is generated by a function in modules/tracks/views/view-track.js
		 */

		model.destroy();
	},

	_createPlaylist: function(data){
		
		$.ajax({
			type: 'POST',
			url: window.API_ROOT + 'playlists/',
			dataType: 'JSON',
			data: data,
			success: this._createPlaylistSuccess,
			error: this._onError
		});
	},

	_createPlaylistSuccess: function(data){

		dataStore.playlistsCollection.fetch();
	},

	_deletePlaylist: function(model){

		model.destroy();
	},

	_voteTrack: function(data){

		/*
		 *	
		 */

		// TODO

		return console.log(data);
	},

	_onError: function(error){

		/*
		 *	Error callback when an ajax request fails.
		 */

		return console.log('Error', error);
	}
});