var PlaylistsAll = require('./view-playlists-all');
var PlaylistTracks = require('../views/view-playlist-tracks');
var PlaylistCreateModal = require('../views/view-modal-playlist-create');
var TracksCollection = require('../collections/collections-tracks');

module.exports = Marionette.LayoutView.extend({

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

	onRender:function(){

		//dont start listening until the region is ready
		////http://stackoverflow.com/questions/11974176/understanding-layouts-in-marionette-for-backbone-js

		this.playlistsAll.show(new PlaylistsAll());
		
		this.listenTo(dispatcher, 'playlist:tracks:show', this._onPlaylistTracksShow, this);
		this.listenTo(dispatcher, 'playlist:show', this._onPlaylistShow, this);

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