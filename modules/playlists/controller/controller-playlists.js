var PlaylistsLayout = require('../views/layout-playlists');
var PlaylistsAll = require('../views/view-playlists-all');
var PlaylistTracks = require('../views/view-playlist-tracks');
var ModelPlaylistAdd = require('../models/models-playlist-add');
var TracksCollection = require('../collections/collections-tracks');

var ModelPlaylistQueue = require('../models/models-playlist-queue');


var TracksModel = require('../models/models-tracks');

/*
 *	Modals
 */

var QueuesAddTrackModal = require('../../core/modals/views/modal-queues-add-track');
var PlaylistsAddTrackModal = require('../../core/modals/views/modal-playlists-add-track');

/*
 *	Api services
 */

var addTrackToPlaylist = require('../../../js/src/utils/api').addTrackToPlaylist;
var addTrackToQueue = require('../../../js/src/utils/api').addTrackToQueue;

module.exports = Marionette.Controller.extend({
	
	initialize: function(){
		this.layout = new PlaylistsLayout();

		var PlaylistRoute = Marionette.SubRouter.extend({

			controller: {

				loadPlaylist: function(id){
					console.log(id);
				}	
			},

			appRoutes: {
				':id': 'loadPlaylist'
			},
			
		});

		var playlistRoute = new PlaylistRoute('playlists');

		this.listenTo(this.layout, 'show', this.onShow);
		
	},

	show: function(){

		/*
		 *	Return playlists layout view
		 */
		
		return this.layout;
	},

	onShow: function(){

		var self = this;

		/*
		 *	Render the list of playlists
		 */

		var playlistsAll = new PlaylistsAll();
		self.layout.playlistsAll.show(playlistsAll);

		self.layout.listenTo(playlistsAll, 'childview:playlists:tracks:show', function(view, id){
			self._onPlaylistShow(id);
		}.bind(self));

		
	},

	_onPlaylistShow: function(id){

		var self = this;

		var collectionPlaylistTracks = new TracksCollection([], {url: window.API_ROOT + 'playlists/' + id + '/tracks/'});

		var viewPlaylistTracks = new PlaylistTracks({collection: collectionPlaylistTracks, model: new TracksModel({id: id})});

		self.layout.playlistsTracks.show(viewPlaylistTracks);

		// Listen for the show playlist modal

		self.layout.listenTo(viewPlaylistTracks, 'childview:playlists:tracks:modal', function(view, data){
			self._onAddToPlaylist(data);
		}.bind(self));

		// Listen for the show queue modal
		
		self.layout.listenTo(viewPlaylistTracks, 'childview:queue:tracks:modal', function(view, data){
			self._onAddToQueue(data);
		}.bind(self));

		Backbone.history.navigate('/playlists/' + id);
	},

	_onAddToPlaylist: function(data){

		/*
		 *	Initialise the Add To Playlist modal
		 */

		var self = this;

		var modelPlaylistAdd = new ModelPlaylistAdd({
			playlist: data.playlist,
			track: data.track
		});

		var playlistAddTrackModal = new PlaylistsAddTrackModal({
			model: modelPlaylistAdd,
			collection: dataStore.playlistsCollection
		})

		self.layout.modalContainer.show(playlistAddTrackModal);

		self.layout.listenTo(playlistAddTrackModal, 'playlist:tracks:add', self.onPlaylistsTracksAdd);
	},

	onPlaylistsTracksAdd: addTrackToPlaylist,

	_onAddToQueue: function(id){

		/*
		 *	Initialise the Add To Queue modal
		 */

		var self = this;

		var modelPlaylistQueue = new ModelPlaylistQueue({
			track: id
		});

		var modalAddQueue = new QueuesAddTrackModal({
			model: modelPlaylistQueue,
			collection: dataStore.queuesCollection
		});

		self.layout.modalContainer.show(modalAddQueue);


		self.layout.listenTo(modalAddQueue, 'queues:tracks:add', self.onQueuesTracksAdd);
	},

	onQueuesTracksAdd: addTrackToQueue,

});