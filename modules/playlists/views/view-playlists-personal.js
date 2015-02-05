var ViewPlaylist = require('./view-playlists');

var Collection = Backbone.Collection.extend();

module.exports = ViewPlaylist.extend({

	template:  require('../templates/view-playlists-personal.hbs'),

	collection: new Collection(),

	initialize: function(){

		var owner = dataStore.appModel.get('displayName');

		var playlists = dataStore.playlistsCollection.filter(function(e){ return e.get('owner') === owner; });
		
		this.listenTo(dataStore.playlistsCollection, 'add', this._onPlaylistAdd, this);
		this.listenTo(dataStore.playlistsCollection, 'remove', this._onPlaylistRemove, this);
		this.collection.add(playlists);
	},

	_onPlaylistAdd: function(playlist){
		if(playlist.get('owner') === dataStore.appModel.get('displayName')){
			this.collection.add(playlist);
		}
	}
});