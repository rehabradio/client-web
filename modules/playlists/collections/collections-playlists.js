var BaseCollection = require('../../../js/src/base-collection');

var Playlist = require('../models/models-playlists');

module.exports = BaseCollection.extend({

	request: 'playlists',

	model: Playlist

});