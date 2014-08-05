Backbone = require('backbone');
$ = require('jquery');

Backbone.$ = $;

datastore = require('../utils/dataStore');
dispatcher = require('../utils/dispatcher'); 

var AppView = Backbone.View.extend({

	el: '#app',

	preload: {
		queue: require('../modules/queue/views/view-queue'),
		playlist: require('../modules/playlists/views/view-playlists')

	},
	
	views: {
		search: require('../modules/search/views/view-search'),
		tracks: require('../modules/tracks/views/view-tracks')

	},

	initialize: function(){
		var self = this;

		console.log('App Initialised');


		console.log('creating global events...');

		dispatcher.on('collections-when-pre-loaded', self._startApp.bind(self));
		dispatcher.on('add-track-to-queue', self._addTrackToQueue);
		dispatcher.on('add-track-to-playlist', self._addTrackToPlaylist);
		dispatcher.on('queue-track-vote', self._voteTrack);

		console.log('booting views...');

		$.when(self._loadQueue).then(function(){
			dispatcher.trigger('collections-when-pre-loaded');
		});

		for(var view in self.views){
			new self.views[view]();
		}

	},

	_loadQueue: function(){
		var deferred = $.Deferred();

		$.when(
			dataStore.playlistsCollection.
			dataStore.queueCollection
		).then(function(){
			return deferred.resolve();
		});

		return deferred;
	},

	_startApp: function(){

		for(var view in this.preload){
			new this.preload[view]();
		}
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
		$.ajax({
			method: 'GET',
			url: '/api/metadata/tracks/add/playlist/?source_type=' + data.sourceType + '&source_id=' + data.sourceId + '&playlist_id=' + data.playlistId,
			success: this._addTrackToPlaylistSuccess,
			error: this._onError
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