var BaseCollection = require('../../core/base-collection');

var Playlist = require('../models/models-playlists');

module.exports = BaseCollection.extend({

	request: 'playlists',

	model: Playlist

});