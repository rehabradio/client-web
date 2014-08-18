/*
 *	Stores the data for tracks within a playlist.
 */
 
var BaseCollection = require('../../core/base-collection');

var TrackModel = require('../models/models-track.js');

module.exports = BaseCollection.extend({

	playlist: null,

	url: function(){
		return window.API_ROOT + 'playlists/' + this.playlist + '/tracks/';
	},
	
	model: TrackModel
});
