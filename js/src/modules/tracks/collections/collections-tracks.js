tracksBackbone = require('backbone');

TrackModel = require('../models/models-track.js');

module.exports = Backbone.Collection.extend({
	
	model: TrackModel,

	urlRoot: '/api/playlists/',

	url: function(id){
		return this.urlRoot + id;
	},

	initialize: function(){

		// dispatcher.on('show-tracks', this._update, this); // TODO - probably needs to be more advanced
		dispatcher.on('tracks-collection-reset', this._onReset, this);

		this.on('add', this._onAddModel, this);
		// this.on('remove', function(model){
		// 	console.log('remove', model)
		// }, this);
	},

	parse: function(resp){
		return resp.tracks;
	},

	_onAddModel: function(model){

		dispatcher.trigger('tracks-add', model);
	},

	_onReset: function(id){

		this.fetch({
			url: this.url(id),
			// reset: true,
			add: true,
			remove: true,
			success: function(){
				dispatcher.trigger('tracks-populate');
			},
			error: function(){

			}
		});
	},

	_update: function(id){
		this.fetch({
			url: this.url(id)
		});
	}
});
