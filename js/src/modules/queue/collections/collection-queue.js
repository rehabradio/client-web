var BaseCollection = require('../../../base-collection');

var Queue = require('../models/models-queue');

module.exports = BaseCollection.extend({

	request: 'queue',

	model: Queue,
	
});