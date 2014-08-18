var ViewQueueItem = require('./view-queues-list-item');

module.exports = Marionette.CompositeView.extend({

	// tagName: 'ul',
	template: require('../templates/view-queues-list.hbs'),
	
	collection: dataStore.queuesCollection,

	childView: ViewQueueItem,

	childViewContainer: 'ul',

	initialize: function(){
		
	}

});