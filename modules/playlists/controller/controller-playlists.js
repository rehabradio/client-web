var LayoutPlaylists 		= require('../views/layout-playlists');
var PlaylistsPublic 		= require('../views/view-playlists-public');
var PlaylistsPersonal 		= require('../views/view-playlists-personal');
var PlaylistTracks 			= require('../views/view-playlist-tracks');
var ModelPlaylistAdd 		= require('../models/models-playlist-add');
var TracksCollection 		= require('../collections/collection-playlists-tracks');

var CollectionPlaylists 	= require('../../../modules/playlists/collections/collection-playlists-all');
var ModelPlaylistQueue 		= require('../models/models-playlist-queue');

var PlaylistsControls 		= require('../views/view-playlists-controls');

var TracksModel 			= require('../models/models-tracks');

/*
 *	Modals
 */

var QueuesAddTrackModal 	= require('../../core/modals/views/modal-queues-add-track');
var PlaylistsAddTrackModal 	= require('../../core/modals/views/modal-playlists-add-track');
var PlaylistsCreateModal 	= require('../../core/modals/views/modal-playlists-create');
var PlaylistsDeleteModal 	= require('../../core/modals/views/modal-playlists-delete');

/*
 *	Api services
 */

var API = require('../../../js/src/utils/api');

module.exports = Marionette.Controller.extend({
	
	initialize: function(){

		this.layout = new LayoutPlaylists({
			regions: {
				playlistsUser: '#playlists-user',
				playlistsPersonal: '#playlists-personal',
				playlistsPublic: '#playlists-public',
				playlistsTracks: '#playlists-tracks',
				modalContainer: '#playlist-modal-container',
				playlistsControls: '#playlists-controls'
			}
		});

		dataStore.playlistsCollection.fetch();

		dataStore.playlistTracksCollections = [];

		this.API = API;
		
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

		var playlistsPersonal = new PlaylistsPersonal();
		self.layout.playlistsPersonal.show(playlistsPersonal);

		var playlistsPublic = new PlaylistsPublic();
		self.layout.playlistsPublic.show(playlistsPublic);

		/*
		 *	Listen for events from child views
		 */

		self.layout.listenTo(playlistsControls, 'playlists:create', self._createPlaylistModal.bind(self));

		self.layout.listenTo(playlistsPersonal, 'childview:playlists:tracks:show', function(view, id){
			self._onPlaylistShow(id);
		}.bind(self));

		self.layout.listenTo(playlistsPersonal, 'childview:playlists:delete', function(view, data){
			self._deletePlaylistModal(data);
		}.bind(self));

		self.layout.listenTo(playlistsPublic, 'childview:playlists:tracks:show', function(view, id){
			self._onPlaylistShow(id);
		}.bind(self));

		self.layout.listenTo(playlistsPublic, 'childview:playlists:delete', function(view, data){
			self._deletePlaylistModal(data);
		}.bind(self));

		/*
		 *	routing for initial page load to trigger an event to show the playlist tracks
		 */

		var PlaylistRoute = Marionette.SubRouter.extend({

			controller: {

				loadPlaylist: self._onPlaylistShow.bind(self)
			},

			appRoutes: {
				':id': 'loadPlaylist'
			},
			
		});

		var playlistRoute = new PlaylistRoute('playlists');
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
		});

		self.layout.modalContainer.show(playlistsDeleteModal);

		self.layout.listenTo(playlistsDeleteModal, 'playlist:delete:confirm', function(model){
			
			model.destroy();
		});

	},

	_onPlaylistShow: function(id){

		var self = this,
			model;
		
		id = Number(id);

		if(!_.find(dataStore.playlistTracksCollections, function(element){ return element.id === id; })){
			dataStore.playlistTracksCollections.push(new TracksCollection([], {
				id: id,
				url: window.API_ROOT + 'playlists/' + id + '/tracks/'
			}));
		}

		model = dataStore.playlistsCollection.findWhere({id: id});

		if(!model){
			model = new TracksModel({
				// id: id
				url: window.API_ROOT + 'playlists/' + id + '/'
			});
		}

		var viewPlaylistTracks = new PlaylistTracks({
			model: model,
			collection: _.find(dataStore.playlistTracksCollections, function(element){ return element.id === id; })
		});

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

		var playlistAddTrackModal = new PlaylistsAddTrackModal({
			request: $.Deferred().resolve({id: data.track}), //
			collection: dataStore.playlistsCollection
		});

		this.layout.modalContainer.show(playlistAddTrackModal);

		this.layout.listenTo(playlistAddTrackModal, 'playlist:tracks:add', this.API.Playlists.addTrackToPlaylist);
	},

	_onAddToQueue: function(id){

		/*
		 *	Initialise the Add To Queue modal
		 */

		// var modelPlaylistQueue = new ModelPlaylistQueue({
		// 	track: id
		// });

		var modalAddQueue = new QueuesAddTrackModal({
			// model: modelPlaylistQueue,
			request: $.Deferred().resolve({id: id}), //
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