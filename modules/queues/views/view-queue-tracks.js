var ViewCollectionBase = require('../../core/views/view-collection-view-base'),
	ViewTrack = require('./view-queue-track');

module.exports = ViewCollectionBase.extend({

	template: require('../templates/view-tracks.hbs'),

	emptyTemplate: _.template('<span>No tracks</span>'),

	ChildView: ViewTrack,

	parentElement: '.tracks',
});
