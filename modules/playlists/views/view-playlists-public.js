var ViewPlaylist = require('./view-playlists');

var Collection = Backbone.Collection.extend();

module.exports = ViewPlaylist.extend({

	template:  require('../templates/view-playlists-public.hbs'),

	collection: new Collection(),

	initialize: function(){

    	this.listenTo(this, 'before:remove:child', this._triggerRemoveAnimation, this);

		var owner = dataStore.appModel.get('displayName');

		var playlists = dataStore.playlistsCollection.filter(function(e){ return e.get('owner') !== owner; });
		
		this.listenTo(dataStore.playlistsCollection, 'add', this._onPlaylistAdd, this);
		this.listenTo(dataStore.playlistsCollection, 'remove', this._onPlaylistRemove, this);
		this.collection.add(playlists);
	},

	_onPlaylistAdd: function(playlist){
		if(playlist.get('owner') !== dataStore.appModel.get('displayName')){
			this.collection.add(playlist);
		}
	}
});