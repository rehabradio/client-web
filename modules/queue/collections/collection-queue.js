var BaseCollection = require('../../core/base-collection');

var Queue = require('../models/models-queue');

module.exports = BaseCollection.extend({

	request: 'queue',

	model: Queue,
	
});