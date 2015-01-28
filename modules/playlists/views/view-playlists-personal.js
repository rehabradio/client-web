var PlaylistView = require('./view-playlist');
var EmptyView = require('./view-playlists-empty');

var Collection = Backbone.Collection.extend();

module.exports = Marionette.CompositeView.extend({

	childView: PlaylistView,

	template:  require('../templates/view-playlists-personal.hbs'),

	emptyView: EmptyView,

	childViewContainer: '.playlists',

	initialize: function(){

		var owner = dataStore.appModel.get('displayName');

		var playlists = dataStore.playlistsCollection.filter(function(e){ return e.get('owner') === owner; });
		
		this.listenTo(dataStore.playlistsCollection, 'add', this._onPlaylistAdd, this);
		this.listenTo(dataStore.playlistsCollection, 'remove', this._onPlaylistRemove, this);
		this.collection = new Collection(playlists);
	},

	_onPlaylistAdd: function(playlist){
		if(playlist.get('owner') === dataStore.appModel.get('displayName')){
			this.collection.add(playlist);
		}
	},

	_onPlaylistRemove: function(playlist){
		this.collection.remove(playlist);
	}
});