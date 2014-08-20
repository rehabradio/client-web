var PlaylistsAll = require('./view-playlists-all');
var PlaylistTracks = require('../views/view-playlist-tracks');
var PlaylistCreateModal = require('../views/view-modal-playlist-create');
var TracksCollection = require('../collections/collections-tracks');

module.exports = Marionette.LayoutView.extend({

	el: '#playlists',

	events: {
		'click #playlist-create': '_onPlaylistCreate'
	},

	template: require('../templates/view-playlists.hbs'),

	regions: {
		playlistsUser: '#playlists-user',
		playlistsAll: '#playlists-all',
		playlistsTracks: '#playlists-tracks',
		modalContainer: '#playlist-modal-container'
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

		this.$el.find('.left-column').addClass('contract');
	},

	_onPlaylistCreate: function(){
		this.modalContainer.show(new PlaylistCreateModal());
	}

});