var AppView = Backbone.View.extend({

	el: '#app',

	/*
	 *	These views are initialised only once the data has been loaded to the dataStore.
	 *	This uses jQuery Promises
	 */

	preload: {
		queue: require('../../queue/views/view-queue'),
		playlist: require('../../playlists/views/view-playlists')

	},

	/*
	 *	These views can be loaded on start up as they don't rely on external data.
	 */
	
	views: {
		search: require('../../search/views/view-search'),
		tracks: require('../../tracks/views/view-tracks')

	},

	initialize: function(){
		var self = this;

		console.log('App Initialised');

		console.log('Creating global events...');

		/*
		 *	Assign events to the global dispatcher	
		 */

		dispatcher.on('collections-when-pre-loaded', self._startApp.bind(self));
		dispatcher.on('add-track-to-queue', self._addTrackToQueue.bind(self));
		dispatcher.on('add-track-to-playlist', self._addTrackToPlaylist.bind(self));
		dispatcher.on('queue-track-vote', self._voteTrack.bind(self));
		
		dispatcher.on('delete-track-from-queue', self._deleteTrackFromQueue.bind(self));

		

		dispatcher.on('tracks-collection-reset', self._addToTracks.bind(self));

		

		console.log('booting views...');
		
		/*
		 *	Callback for when the deferred object is resolved
		 */

        var loadQueue = self._preloadData();

		$.when(loadQueue).then(function(){
			dispatcher.trigger('collections-when-pre-loaded');
		});

		/*
		 *	Initialise views that don't rely on external data
		 */

		for(var view in self.views){
			new self.views[view]();
		}

	},

	_preloadData: function(){

		/*
		 *	Deferred object to be resolved once data for Playlists and Queue has been loaded
		 */

		var deferred = $.Deferred();

		$.when(
			dataStore.playlistsCollection.fetch(),
			dataStore.queueCollection.fetch()
		).then(function(){
			return deferred.resolve();
		});

		return deferred;
	},

	_startApp: function(){
		// TODO - Remove a preloader

		for(var view in this.preload){
			new this.preload[view]();
		}
	},

	/*
	 *	Functions to be called when events are triggered from the modules.
	 */

	_addToTracks: function(id){

		/*
		 *	Called by clicking on a playlist
		 */

		// TODO - Fix url
		dataStore.tracksCollection.fetch({
			url: 'http://localhost:8000/api/playlists/' + id + '/tracks',
			add: true,
			remove: true
		});
	},

	_addTrackToQueue: function(id){

		/*
		 *	Adds the selected track to the queue. This uses the href of the link which is generated on the backend
		 *	and added to the template on render
		 */


		$.ajax({
			type: 'POST',
			url: 'http://localhost:8000/api/queue/' + id,
			success: this._addTrackToQueueSuccess,
			error: this._onError
		});
	},

	_addTrackToQueueSuccess: function(){

		/*
		 *	Callback for a successful call to add track to queue
		 */

		dataStore.queueCollection.fetch({
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

		// $.ajax({
		// 	type: 'DELETE',
		// 	url: 'http://localhost:8000/api/queue/' + id + '/',
		// 	dataType: 'JSON',
		// 	success: this._deleteTrackFromQueueSuccess,
		// 	error: this._onError
		// });
	},

	_deleteTrackFromQueueSuccess: function(){

		/*
		 *	Callback for a successful call to delete track from queue
		 */

		 dataStore.queueCollection.fetch({
			add: true,
			remove: true
		});
	},

	_addTrackToPlaylist: function(data){

		/*
		 *	Adds the selected track to the playlist. The data is generated by a function in modules/tracks/views/view-track.js
		 */

		// TODO - Fix url, grab url from collection?

		var self = this;

		$.ajax({
			type: 'PUT',
			url: 'http://localhost:8000/api/playlists/1/',
			data: data,
			success: self._addTrackToPlaylistSuccess,
			error: self._onError
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