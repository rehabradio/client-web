var BaseCollection = require('../../core/base-collection');
var ModelPlaylist = require('../models/models-playlists');

var CollectionPlaylistsPublic = BaseCollection.extend({
	
	request: 'playlists',
	
	model: ModelPlaylist

});

module.exports = new CollectionPlaylistsPublic();