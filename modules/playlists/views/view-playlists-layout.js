var PlaylistsModel = require('../models/models-playlists');
var PlaylistsAll = require('./view-playlists-all');
var PlaylistView = require('./view-playlist');
var PlaylistTracks = require('../views/view-playlist-tracks');
var TracksCollection = require('../collections/collections-tracks');

module.exports = Marionette.LayoutView.extend({

	el: '#playlists',

	template: require('../templates/view-playlists.hbs'),

	regions: {
		playlistsUser: '#playlists-user',
		playlistsAll: '#playlists-all',
		playlistsTracks: '#playlists-tracks'
	},

	initialize: function(){

		this.render();

		this.playlistsAll.show(new PlaylistsAll());

		dispatcher.on('playlist:tracks:show', this._onPlaylistTracksShow.bind(this));

		dispatcher.on('playlist:show', this._onPlaylistShow.bind(this));
	},

	_onPlaylistShow: function(id){

		var collectionPlaylistTracks = new TracksCollection([], {url: window.API_ROOT + 'playlists/' + id + '/tracks/'});

		var viewPlaylistTracks = new PlaylistTracks({collection: collectionPlaylistTracks});

		this.playlistsTracks.show(viewPlaylistTracks);
	},

	_onPlaylistTracksShow: function(){

		this.$el.find('.left-column').addClass('contract')
	}

});