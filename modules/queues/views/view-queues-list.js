var ViewQueueItem = require('./view-queues-list-item');

module.exports = Marionette.CollectionView.extend({

	tagName: 'ul',
	
	collection: dataStore.queueCollection,

	childView: ViewQueueItem,

	initialize: function(){
		
	}

});