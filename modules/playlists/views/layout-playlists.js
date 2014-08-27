// var PlaylistsAll = require('./view-playlists-all');
// var PlaylistTracks = require('../views/view-playlist-tracks');
// var PlaylistCreateModal = require('../views/modal-playlist-create');
// var PlaylistAddTrackModal = require('../views/modal-playlist-add-track');
// var ModelPlaylistAdd = require('../models/models-playlist-add');
// var ModalAddQueue = require('../../core/modals/views/modal-add-queue');
// var ModelPlaylistQueue = require('../models/models-playlist-queue');
// var TracksModel = require('../models/models-tracks');
// var TracksCollection = require('../collections/collections-tracks');


module.exports = Marionette.LayoutView.extend({

	events: {
		'click #playlist-create': '_onPlaylistCreate'// Move to view
	},

	template: require('../templates/view-playlists.hbs'),

	className: 'playlists',

	initialize: function(options){
		this.regions = options.regions;
	},

	regions: {
		playlistsUser: '#playlists-user',
		playlistsAll: '#playlists-all',
		playlistsTracks: '#playlists-tracks',
		modalContainer: '#playlist-modal-container'
	},

	onRender:function(){

		//dont start listening until the region is ready
		////http://stackoverflow.com/questions/11974176/understanding-layouts-in-marionette-for-backbone-js

		var self = this;

		// self.playlistsAll.show(new PlaylistsAll());

		// var PlaylistRoute = Marionette.SubRouter.extend({

		// 	controller: {

		// 		loadPlaylist: function(id){
		// 			self.trigger('playlists:tracks:show', id);
		// 		}	
		// 	},

		// 	appRoutes: {
		// 		':id': 'loadPlaylist'
		// 	},
			
		// });

		// var playlistRoute = new PlaylistRoute('playlists');
		
		self.listenTo(dispatcher, 'playlist:tracks:show', self._onPlaylistTracksShow, self);

		self.listenTo(dispatcher, 'playlist:tracks:modal', self._onAddToPlaylist, self);

		self.listenTo(dispatcher, 'playlist:queue:modal', self._onAddToQueue, self);

		self.listenTo(dispatcher, 'playlist:show', self._onPlaylistShow, self);


		// ####################################### Temp Maybe
		// Backbone.history.navigate('playlists', {trigger: false});

	},

	// _onPlaylistShow: function(id){

	// 	var collectionPlaylistTracks = new TracksCollection([], {url: window.API_ROOT + 'playlists/' + id + '/tracks/'});

	// 	var viewPlaylistTracks = new PlaylistTracks({collection: collectionPlaylistTracks, model: new TracksModel({id: id})});

	// 	this.playlistsTracks.show(viewPlaylistTracks);


	// 	// ####################################### Temp Maybe
	// 	Backbone.history.navigate('playlists/' + id, {trigger: false})
	// 	this._onPlaylistTracksShow();
	// },

	_onPlaylistTracksShow: function(){

		this.$el.find('.left-column').addClass('contract');
	},

	_onPlaylistCreate: function(){
		this.modalContainer.show(new PlaylistCreateModal());
	},

	// _onAddToPlaylist: function(data){

	// 	/*
	// 	 *	Initialise the Add To Playlist modal
	// 	 */

	// 	var modelPlaylistAdd = new ModelPlaylistAdd({
	// 		playlist: data.playlist,
	// 		track: data.track
	// 	});

	// 	this.modalContainer.show(new PlaylistAddTrackModal({
	// 		model: modelPlaylistAdd,
	// 		collection: dataStore.playlistsCollection
	// 	}));
	// },

	// _onAddToQueue: function(id){

	// 	/*
	// 	 *	Initialise the Add To Playlist modal
	// 	 */

	// 	var modelPlaylistQueue = new ModelPlaylistQueue({
	// 		track: id
	// 	});

	// 	this.modalContainer.on('show', function(){
	// 		console.log('show');

	// 		this.modalContainer.on('save', function(){
	// 			console.log('test');
	// 		});
	// 	}.bind(this));

	// 	this.modalContainer.show(new ModalAddQueue({
	// 		model: modelPlaylistQueue,
	// 		collection: dataStore.queuesCollection
	// 	}));

	// },


	// _addTrackToQueue: function(data){

		
	// },

	// _addTrackToQueueSuccess: function(){

	// },

	_onError: function(error){
		console.log(error);
	}

});