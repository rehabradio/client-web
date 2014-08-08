/*
 *	Stores the data for tracks within a playlist.
 */
 
var BaseCollection = require('../../core/base-collection');

var TrackModel = require('../models/models-track.js');

module.exports = BaseCollection.extend({
	
	model: TrackModel,

	// urlRoot: this.API_ENDPOINT + '/playlists/',

	// url: function(id){
	// 	return this.urlRoot + id + '/tracks';
	// },

});
