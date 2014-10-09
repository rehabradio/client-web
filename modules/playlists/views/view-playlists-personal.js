var PlaylistView = require('./view-playlist');
var EmptyView = require('./view-playlists-empty');

module.exports = Marionette.CompositeView.extend({

	childView: PlaylistView,

	template:  require('../templates/view-playlists-personal.hbs'),

	emptyView: EmptyView,

	childViewContainer: '.playlists',

	initialize: function(){
		this.collection = dataStore.collectionPlaylistsPersonal;
	}
});