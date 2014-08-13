var ViewQueueItem = require('./view-queues-item');

module.exports = Marionette.CollectionView.extend({

	tagName: 'li',

	collection: dataStore.queueCollection,

	childView: ViewQueueItem,

	initialize: function(){

	}

});