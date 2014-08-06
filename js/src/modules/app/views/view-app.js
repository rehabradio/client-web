var AppView = Backbone.View.extend({

	el: '#app',

	preload: {
		queue: require('../../queue/views/view-queue'),
		playlist: require('../../playlists/views/view-playlists')

	},
	
	views: {
		search: require('../../search/views/view-search'),
		tracks: require('../../tracks/views/view-tracks')

	},

	initialize: function(){
		var self = this;

		console.log('App Initialised');


		console.log('Creating global events...');

		dispatcher.on('collections-when-pre-loaded', self._startApp.bind(self));
		dispatcher.on('add-track-to-queue', self._addTrackToQueue);
		dispatcher.on('add-track-to-playlist', self._addTrackToPlaylist);
		dispatcher.on('queue-track-vote', self._voteTrack);

		dispatcher.on('tracks-collection-reset', self._addToTracks);

		

		console.log('booting views...');

        var loadQueue = self._preloadData();

		$.when(self._preloadData).then(function(){
			dispatcher.trigger('collections-when-pre-loaded');
		});

		for(var view in self.views){
			new self.views[view]();
		}

	},

	_preloadData: function(){
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

	_addToTracks: function(id){
		// TODO - Fix url
		dataStore.tracksCollection.fetch({
			url: 'http://localhost:8000/api/playlists/' + id,
			add: true,
			remove: true,
		});
	},

	_addTrackToQueue: function(data){

		$.ajax({
			method: 'GET',
			url: data.href,
			success: this._addTrackToQueueSuccess,
			error: this._onError
		});
	},

	_addTrackToQueueSuccess: function(res){
		return console.log('add track to queue success', res);
	},

	_addTrackToPlaylist: function(data){
		// TODO - Fix url

		var self = this;

		$.ajax({
			method: 'GET',
			url: 'http://localhost:8000/api/metadata/tracks/add/playlist/?source_type=' + data.sourceType + '&source_id=' + data.sourceId + '&playlist_id=' + data.playlistId,
			success: self._addTrackToPlaylistSuccess,
			error: self._onError
		});
	},

	_addTrackToPlaylistSuccess: function(res){
		return console.log('Add to playlist success', res);
	},

	_voteTrack: function(data){
		return console.log(data);
	},

	_onError: function(error){
		return console.log('Error', error);
	}
});

module.exports = AppView;