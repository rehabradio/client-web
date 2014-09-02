var PlaylistView = require('./view-playlist');
var EmptyView = require('./view-playlists-empty');

module.exports = Marionette.CollectionView.extend({

	childView: PlaylistView,

	collection: dataStore.playlistsCollection,

	emptyView: EmptyView,

	className: 'playlists'
});