var ViewQueueItem = require('./view-queues-list-item');

module.exports = Marionette.CompositeView.extend({

	childView: ViewQueueItem,
	childViewContainer: 'ul',

	collection: dataStore.queuesCollection,

	template: require('../templates/view-queues-list.hbs'),

	initialize: function(){
		console.log('CompositeView::Queue::initialize', this.collection);
		this.render();
	}
});