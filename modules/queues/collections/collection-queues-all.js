var BaseCollection = require('../../core/base-collection');

module.exports = BaseCollection.extend({

	request: 'queues',

	model: require('../models/models-queues'),

	initialize: function(){

		dispatcher.on('socket:queues:update', this.fetch, this);
	}
	
});