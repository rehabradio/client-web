BaseCollection = require('../../../base-collection');

Queue = require('../models/models-queue');

module.exports = BaseCollection.extend({

	request: 'queue',

	model: Queue,
	
});