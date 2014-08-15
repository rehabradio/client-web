
var modelApp = require('../models/models-app'); // Already initialised
var ViewUser = require('./view-user');

var AppView = Backbone.View.extend({

	el: '#app',

	model: modelApp,

	children: [],

	/*
	 *	These views are initialised only once the data has been loaded to the dataStore.
	 *	This uses jQuery Promises
	 */

	preload: {
		queue: require('../../queues/views/view-queues-layout'),
		playlist: require('../../playlists/views/view-playlists')

	},

	/*
	 *	These views can be loaded on start up as they don't rely on external data.
	 */
	

	 //switch to using search controller

	modules: {
		search: require('../../search/controller/controller-search')
	},

	initialize: function(){

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

		var self = this;

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

		dispatcher.on('data-preload-complete', self._onPreloadData.bind(self));

		console.log('Creating global events...');

		dispatcher.on('collections-when-pre-loaded', self._startApp.bind(self));

		dispatcher.on('add-track-to-queue', self._addTrackToQueue.bind(self));
		dispatcher.on('add-track-to-playlist', self._addTrackToPlaylist.bind(self));
		dispatcher.on('queue-track-vote', self._voteTrack.bind(self));
		
		dispatcher.on('tracks-collection-reset', self._viewPlaylistTracks.bind(self));

		dispatcher.on('queue:reset', self._queueResetTracks.bind(self));
		dispatcher.on('queue:add', this._queueAdd, this);
		dispatcher.on('queue:track:delete', self._deleteTrackFromQueue.bind(self));


		console.log('booting views...');
		
		/*
		 *	Callback for when the deferred object is resolved. This loads content needed for the app to function, the queues data and playlists data
		 */

        var loadQueue = self._preloadData();

		$.when(loadQueue).then(function(){
			dispatcher.trigger('data-preload-complete');
		});

		/*
		 *	Initialise views that don't rely on external data
		 */

		for(var view in self.modules){
			
			self.children.push(new self.modules[view]());
		}

	},

	_queueAdd:function(payload){

		var endpoint = 'metadata/tracks/';

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + endpoint,
			data: payload,
			success: this._addTrackToQueue.bind(this),
			error: this._onError
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

	_preloadData: function(){

		/*
		 *	Deferred object to be resolved once data for Playlists and Queue has been loaded
		 */

		var deferred = $.Deferred();

		$.when(
			dataStore.playlistsCollection.fetch(),
			dataStore.queuesCollection.fetch()
		).then(function(){
			return deferred.resolve();
		});

		return deferred;
	},

	_onPreloadData: function(){
		// TODO - Remove a preloader

		for(var view in this.preload){
			this.children.push(new this.preload[view]());
		}
	},

	/*
	 *	Functions to be called when events are triggered from the modules.
	 */

	_viewPlaylistTracks: function(id){

		/*
		 *	Called by clicking on a playlist
		 */

		// TODO - Fix url
		dataStore.tracksCollection.fetch({
			url: window.API_ROOT + 'playlists/' + id + '/tracks/',
			reset: true
			// add: true,
			// remove: true
		});
	},

	_addTrackToQueue: function(id){

		var endpoint = 'queues/' + this.model.get('queueId') + '/tracks/';

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + endpoint,
			data: id,
			success: this._addTrackToQueueSuccess,
			error: this._onError
		});
	},

	_addTrackToQueueSuccess: function(){

		/*
		 *	Callback for a successful call to add track to queue
		 */

		var collection = _.find(dataStore.queueTracksCollections, function(element){ return element.id === dataStore.appModel.get('queueId'); });

		collection.fetch({
			// reset: true,
			add: true,
			remove: true
		});

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
			url: window.API_ROOT + '/playlists/' + data.playlist + '/tracks/' + data.track + '/',
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

module.exports = AppView;