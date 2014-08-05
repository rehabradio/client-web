BaseCollection = require('../../../base-collection');

Playlist = require('../models/models-playlists');

module.exports = BaseCollection.extend({

	request: 'playlists',

	model: Playlist

});