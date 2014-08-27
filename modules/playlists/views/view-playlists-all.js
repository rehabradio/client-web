var PlaylistView = require('./view-playlist');

module.exports = Marionette.CollectionView.extend({

	childView: PlaylistView,

	collection: dataStore.playlistsCollection,

});