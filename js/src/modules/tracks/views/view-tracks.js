/*
 *	Parent view for displaying all tracks within a playlist
 */

var TracksCollection = require('../collections/collections-tracks.js');
var TrackView = require('./view-track.js');

module.exports = Backbone.View.extend({

	el: '#tracks',

	collection: new TracksCollection(),

	initialize: function(){

		// TODO - move to App view
		
		dispatcher.on('tracks-add', this._onTrackAdd, this);
		
	},

	render: function(){

		return this;
	},

	_onTrackAdd: function(model){
		console.log(model);

		var $parent = this.$el.find('table');

		var view = new TrackView({
			model: model
		});

		$parent.append(view.render().$el);

	}
});