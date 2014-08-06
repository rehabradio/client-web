/*
 *	Stores the data for tracks within a playlist.
 */
 
var BaseCollection = require('../../../js/src/base-collection');

var TrackModel = require('../models/models-track.js');

module.exports = BaseCollection.extend({
	
	model: TrackModel,

	urlRoot: this.API_ENDPOINT + '/playlists/',

	url: function(id){
		return this.urlRoot + id;
	},

	initialize: function(){

		this.on('add', this._onAddModel, this);
	},

	parse: function(res){
		return res.tracks.results;
	},

	_onAddModel: function(model){

		dispatcher.trigger('tracks-add', model);
	}
});
