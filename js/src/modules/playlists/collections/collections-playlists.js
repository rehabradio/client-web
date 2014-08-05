BaseCollection = require('../../../base-collection');

// Backbone = require('backbone');
Playlist = require('../models/models-playlists');

module.exports = BaseCollection.extend({

	request: 'playlists',

	model: Playlist
	
});