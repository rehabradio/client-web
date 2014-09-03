var ViewQueueItem = require('./view-queues-list-item');

module.exports = Marionette.CompositeView.extend({

	childView: ViewQueueItem,

	childViewContainer: '.queues',

	collection: dataStore.queuesCollection,

	template: require('../templates/view-queues-list.hbs')
});