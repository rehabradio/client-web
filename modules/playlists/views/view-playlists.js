var PlaylistsModel = require('../models/models-playlists');
var PlaylistView = require('./view-playlist');
var TracksView = require('../views/view-tracks');

module.exports = Marionette.CompositeView.extend({

	childView: PlaylistView,

	childViewContainer: 'ul',

	collection: dataStore.playlistsCollection,

	template: require('../templates/view-playlists.hbs'),

	model: new PlaylistsModel(),

 	childViewOptions : function () { 
		return { 
			parent: this
		};	 
	},

	playlists: [], 

	initialize: function(){

		//composite view will take care of listening to add events and rendering collection.

		/*
		 *	TracksView shares the model with PlaylistsView. When a Playlist is chosen, this model is updated with the id of the currently selected playlist,
		 *	and this value then propagates through to the TrackViews to be used to filter out the current playlist from the selected playlists in 'add-to-playlist'
		 */

		this.tracksView = new TracksView({
			model: this.model
		});

		dispatcher.on('tracks-show', this._showTracks, this);

		
	},

	_showTracks: function(){
		this.$el.addClass('contract');
	},

	_hideTracks: function(){
		this.$el.removeClass('contract');
	}
});