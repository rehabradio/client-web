var ViewTrackItem = require('./view-queue-track');

module.exports = Marionette.CollectionView.extend({

	tagName: 'tbody',

	collection: dataStore.queueTracksCollection,

	childView: ViewTrackItem,

	initialize: function(){

	}

});