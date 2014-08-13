var BaseCollection = require('../../core/base-collection');

var QueueTrack = require('../models/models-queue-tracks');

module.exports = BaseCollection.extend({

	// request: 'queues',

	// queueId: null,

	model: QueueTrack,

	url: null,

	initialize: function(models, options){
		
		this.url = options.url;

		this.fetch();
	}
	
});