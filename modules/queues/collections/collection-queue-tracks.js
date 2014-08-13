var BaseCollection = require('../../core/base-collection');

var QueueTrack = require('../models/models-queue-tracks');

module.exports = BaseCollection.extend({

	request: 'queues',

	queueId: null,

	url: function(){
		return this.API_ENDPOINT + this.request + '/' + this.queueId + '/tracks';
	},

	model: QueueTrack,
	
});