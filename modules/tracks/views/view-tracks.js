/*
 *	Parent view for displaying all tracks within a playlist
 */

var TrackView = require('./view-track.js');

module.exports = Backbone.View.extend({

	el: '#tracks',

	collection: dataStore.tracksCollection,

	initialize: function(){

		this.collection.on('add', this._onTrackAdd, this);
		
	},

	render: function(){

		return this;
	},

	_onTrackAdd: function(model){

		var $parent = this.$el.find('ul');

		var view = new TrackView({
			model: model
		});

		$parent.append(view.render().$el);

	}
});