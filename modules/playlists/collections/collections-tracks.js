/*
 *	Stores the data for tracks within a playlist.
 */
 
var BaseCollection = require('../../core/base-collection');

var TrackModel = require('../models/models-track.js');

module.exports = BaseCollection.extend({

	url: null,

	initialize: function(models, options){
		this.url = options.url;

		this.fetch();
	},
	
	model: TrackModel
});
