/*
 *	Parent view for displaying all tracks within a playlist
 */

var TrackView = require('./view-track.js');
var TrackModel = require('../models/models-tracks.js');

module.exports = Backbone.View.extend({

	el: '#tracks',

	collection: dataStore.tracksCollection,

	initialize: function(){

		this.collection.on('add', this._onTracksAdd, this);
		this.collection.on('reset', this._onTrackReset, this);
		
		this.$parent = this.$el.find('tbody');
	},

	render: function(){

		return this;
	},

	_onTracksAdd: function(model){

		var view = new TrackView({
			model: model
		});

		this.$parent.append(view.render().$el);

	},

	_onTrackReset: function(){

		var self = this;

		self.$parent.empty();

		self.collection.each(function(model){
			var view = new TrackView({
				model: model,
				playlist: self.model.get('id')
			});

			self.$parent.append(view.render().$el);
		});
	}
});