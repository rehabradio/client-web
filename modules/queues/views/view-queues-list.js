var ViewQueueItem = require('./view-queues-list-item');

module.exports = Marionette.CollectionView.extend({

	tagName: 'ul',
	
	collection: dataStore.queuesCollection,

	childView: ViewQueueItem,

	initialize: function(){
		
	}

});