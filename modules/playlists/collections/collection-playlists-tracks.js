/*
 *	Stores the data for tracks within a playlist.
 */
 
var BaseCollection = require('../../core/base-collection');

var TrackModel = require('../models/models-track.js');

module.exports = BaseCollection.extend({

	url: null,

	model: TrackModel,

	initialize: function(models, options){
		this.url = options.url;
		this.id = Number(options.id);

		this.fetch();

		this.listenTo(dispatcher, 'socket:playlists:tracks:update', this.update, this);
	},

	update: function(data){

		/*
		 *	Calls the build in 'set' method that merges the collection from the server with the current one.
		 */

		if(data.id === this.id){
			this.set(data, {parse: true});
		}
	}
});
