var ViewQueues = require('./view-queues');
var ViewQueueTracks = require('./view-queue-tracks');

module.exports = Marionette.LayoutView.extend({

	el: '#queue',

	template: require('../templates/view-queues.hbs'),

	regions: {

		queues: 'ul',
		queueTracks: 'table'
	},

	initialize: function(){
		this.render();
		this.queues.show(new ViewQueues);
		this.queueTracks.show(new ViewQueueTracks);
	}
});