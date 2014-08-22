var PlaylistsAll = require('./view-playlists-all');
var PlaylistTracks = require('../views/view-playlist-tracks');
var PlaylistCreateModal = require('../views/modal-playlist-create');
var PlaylistAddTrackModal = require('../views/modal-playlist-add-track');
var ModelPlaylistAdd = require('../models/models-playlist-add');
var PlaylistAddQueueModal = require('../views/modal-playlist-add-queue');
var ModelPlaylistQueue = require('../models/models-playlist-queue');
var TracksModel = require('../models/models-tracks');
var TracksCollection = require('../collections/collections-tracks');

module.exports = Marionette.LayoutView.extend({

	events: {
		'click #playlist-create': '_onPlaylistCreate'
	},

	template: require('../templates/view-playlists.hbs'),

	className: 'playlists',

	regions: {
		playlistsUser: '#playlists-user',
		playlistsAll: '#playlists-all',
		playlistsTracks: '#playlists-tracks',
		modalContainer: '#playlist-modal-container'
	},

	onRender:function(){

		//dont start listening until the region is ready
		////http://stackoverflow.com/questions/11974176/understanding-layouts-in-marionette-for-backbone-js

		this.playlistsAll.show(new PlaylistsAll());
		
		this.listenTo(dispatcher, 'playlist:tracks:show', this._onPlaylistTracksShow, this);

		this.listenTo(dispatcher, 'playlist:tracks:modal', this._onAddToPlaylist, this);

		this.listenTo(dispatcher, 'playlist:queue:modal', this._onAddToQueue, this);

		this.listenTo(dispatcher, 'playlist:show', this._onPlaylistShow, this);

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
	},

	_onAddToQueue: function(id){

		/*
		 *	Initialise the Add To Playlist modal
		 */

		var modelPlaylistQueue = new ModelPlaylistQueue({
			track: id
		});

		this.modalContainer.show(new PlaylistAddQueueModal({
			model: modelPlaylistQueue,
			collection: dataStore.queuesCollection
		}));
	}

});