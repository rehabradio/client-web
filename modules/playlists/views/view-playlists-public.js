var PlaylistView = require('./view-playlist');
var EmptyView = require('./view-playlists-empty');

var Collection = Backbone.Collection.extend();

module.exports = Marionette.CompositeView.extend({

	childView: PlaylistView,

	template:  require('../templates/view-playlists-public.hbs'),

	emptyView: EmptyView,

	childViewContainer: '.playlists',

	initialize: function(){

		var user = dataStore.appModel.get('displayName');

		var playlists = dataStore.playlistsCollection.filter(function(e){ return e.get('owner') !== user; });
		
		this.collection = new Collection(playlists);
	}
});