var PlaylistsAll = require('./view-playlists-all');
var PlaylistTracks = require('../views/view-playlist-tracks');
var PlaylistCreateModal = require('../views/modal-playlist-create');
var PlaylistAddTrackModal = require('../views/modal-playlist-add-track');
var ModelPlaylistAdd = require('../models/models-playlist-add');
var TracksModel = require('../models/models-tracks');
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

		dispatcher.on('playlist:tracks:modal', this._onAddToPlaylist.bind(this));

		dispatcher.on('playlist:show', this._onPlaylistShow.bind(this));

	},

	_onPlaylistShow: function(id){

		var collectionPlaylistTracks = new TracksCollection([], {url: window.API_ROOT + 'playlists/' + id + '/tracks/'});

		var viewPlaylistTracks = new PlaylistTracks({collection: collectionPlaylistTracks, model: new TracksModel({id: id})});

		this.playlistsTracks.show(viewPlaylistTracks);
	},

	_onPlaylistTracksShow: function(){

		this.$el.find('.left-column').addClass('contract');
	},

	_onPlaylistCreate: function(){
		this.modalContainer.show(new PlaylistCreateModal());
	},

	_onAddToPlaylist: function(data){

		/*
		 *	Initialise the Add To Playlist modal
		 */

		var modelPlaylistAdd = new ModelPlaylistAdd({
			playlist: data.playlist,
			track: data.track
		});

		this.modalContainer.show(new PlaylistAddTrackModal({
			model: modelPlaylistAdd,
			collection: dataStore.playlistsCollection
		}));
	}

});