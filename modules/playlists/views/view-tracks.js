/*
 *	Parent view for displaying all tracks within a playlist
 */

var TrackView = require('./view-track');

module.exports = Backbone.View.extend({

	el: '#tracks',

	collection: dataStore.tracksCollection,

	initialize: function(){

		// this.playlist = this.model.get('playlist');

		this.collection.on('add', this._onTracksAdd, this);
		this.collection.on('reset', this._onTrackReset, this);
		
		this.$parent = this.$el.find('tbody');
	},

	render: function(){

		return this;
	},

	// _onTracksAdd: function(model){

	// 	var view = new TrackView({
	// 		model: model
	// 	});

	// 	this.$parent.append(view.render().$el);

	// },

	_onTrackReset: function(){

		var self = this;

		self.$parent.empty();

		self.collection.each(function(model){
			var view = new TrackView({
				model: model,
				playlist: self.model.get('playlist')
			});

			self.$parent.append(view.render().$el);
		});
	}
});