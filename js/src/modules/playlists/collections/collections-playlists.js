Backbone = require('backbone');
Playlist = require('../models/models-playlists');

module.exports = Backbone.Collection.extend({

	url: '/api/playlists',

	model: Playlist,
	
	parse: function(resp){

		return resp;
	}
});