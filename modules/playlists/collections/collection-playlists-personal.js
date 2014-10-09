var BaseCollection = require('../../core/base-collection');
var ModelPlaylist = require('../models/models-playlists');

var CollectionPlaylistsPersonal = BaseCollection.extend({
	
	request: 'playlists',

	model: ModelPlaylist
});

module.exports = new CollectionPlaylistsPersonal();