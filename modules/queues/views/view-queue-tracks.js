var ViewTrackItem = require('./view-queue-tracks-item');

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/view-tracks.hbs'),

	childView: ViewTrackItem,

	childViewContainer: 'tbody',

	initialize: function(){
		// this.collection = 
	}

});