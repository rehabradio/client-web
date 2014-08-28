var PlaylistsLayout = require('../views/layout-playlists');
var PlaylistsAll = require('../views/view-playlists-all');
var PlaylistTracks = require('../views/view-playlist-tracks');
var ModelPlaylistAdd = require('../models/models-playlist-add');
var TracksCollection = require('../collections/collections-tracks');

var ModelPlaylistQueue = require('../models/models-playlist-queue');

var PlaylistsControls = require('../views/view-playlists-controls');


var TracksModel = require('../models/models-tracks');

/*
 *	Modals
 */

var QueuesAddTrackModal = require('../../core/modals/views/modal-queues-add-track');
var PlaylistsAddTrackModal = require('../../core/modals/views/modal-playlists-add-track');
var PlaylistsCreateModal = require('../../core/modals/views/modal-playlists-create');
var PlaylistsDeleteModal = require('../../core/modals/views/modal-playlists-delete');

/*
 *	Api services
 */

var API = require('../../../js/src/utils/api');

module.exports = Marionette.Controller.extend({
	
	initialize: function(){

		debugger;

		this.layout = new PlaylistsLayout({
			regions: {
				playlistsUser: '#playlists-user',
				playlistsAll: '#playlists-all',
				playlistsTracks: '#playlists-tracks',
				modalContainer: '#playlist-modal-container',
				playlistsControls: '#playlists-controls'
			}
		});

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
		 *	Return playlists layout view for rendering to DOM
		 */
		
		return this.layout;
	},

	onShow: function(){

		var self = this;

		/*
		 *	Render subviews
		 */

		var playlistsControls = new PlaylistsControls();
		self.layout.playlistsControls.show(playlistsControls);

		var playlistsAll = new PlaylistsAll();
		self.layout.playlistsAll.show(playlistsAll);

		/*
		 *	Listen for events from child views
		 */

		self.layout.listenTo(playlistsControls, 'playlists:create', self._createPlaylistModal.bind(self));

		self.layout.listenTo(playlistsAll, 'childview:playlists:tracks:show', function(view, id){
			self._onPlaylistShow(id);
		}.bind(self));

		self.layout.listenTo(playlistsAll, 'childview:playlists:delete', function(view, data){
			self._deletePlaylistModal(data);
		}.bind(self));

		
	},

	_createPlaylistModal: function(){

		/*
		 *	Initialise the Add To Playlist modal
		 */

		var self = this;

		/*
		 *	Pass the model to the modal so that it can be passed back to the trigger callback and then detroyed on confirm
		 */

		var playlistsCreateModal = new PlaylistsCreateModal();

		self.layout.modalContainer.show(playlistsCreateModal);

		self.layout.listenTo(playlistsCreateModal, 'playlist:create:confirm', this.API.Playlists.createPlaylist);

	},

	//_createPlaylist: createPlaylist,

	_deletePlaylistModal: function(model){

		/*
		 *	Initialise the Add To Playlist modal
		 */

		var self = this;

		/*
		 *	Pass the model to the modal so that it can be passed back to the trigger callback and then detroyed on confirm
		 */

		var playlistsDeleteModal = new PlaylistsDeleteModal({
			model: model
		})

		self.layout.modalContainer.show(playlistsDeleteModal);

		self.layout.listenTo(playlistsDeleteModal, 'playlist:delete:confirm', function(model){
			
			model.destroy();
		});

	},

	_onPlaylistShow: function(id){

		var self = this;

		var collectionPlaylistTracks = new TracksCollection([], {url: window.API_ROOT + 'playlists/' + id + '/tracks/'});

		var viewPlaylistTracks = new PlaylistTracks({collection: collectionPlaylistTracks, model: new TracksModel({id: id})});

		self.layout.playlistsTracks.show(viewPlaylistTracks);

		/*
		 *	Listen for events triggered on child views
		 */

		// Listen for the show playlist modal

		self.layout.listenTo(viewPlaylistTracks, 'childview:playlists:tracks:modal', function(view, data){
			self._onAddToPlaylist(data);
		}.bind(self));

		// Listen for the show queue modal
		
		self.layout.listenTo(viewPlaylistTracks, 'childview:queue:tracks:modal', function(view, data){
			self._onAddToQueue(data);
		}.bind(self));

		// Listen for the show queue modal
		
		self.layout.listenTo(viewPlaylistTracks, 'childview:playlists:tracks:remove', function(view, data){
			self._removeTrackFromPlaylist(data);
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

	//onPlaylistsTracksAdd: function(){},

	_onAddToQueue: function(id){

		/*
		 *	Initialise the Add To Queue modal
		 */

		var modelPlaylistQueue = new ModelPlaylistQueue({
			track: id
		});

		var modalAddQueue = new QueuesAddTrackModal({
			model: modelPlaylistQueue,
			collection: dataStore.queuesCollection
		});

		this.layout.modalContainer.show(modalAddQueue);


		this.layout.listenTo(modalAddQueue, 'queues:tracks:add', this.API.Queues.addTrackToQueue);
	},

	_removeTrackFromPlaylist: function(model){

		/*
		 *	Check if the current user is the owner of the track and only allow deletion if they are.
		 */

		if(model.toJSON().owner !== dataStore.appModel.toJSON().displayName){
			console.log('Cannot remove track from playlist, you are not the owner');
			return;
		}

		model.destroy();
	},

});