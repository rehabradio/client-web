var ViewTrackItem = require('./view-queue-track');

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/view-tracks.hbs'),

	childView: ViewTrackItem,

	childViewContainer: '.tracks'
});