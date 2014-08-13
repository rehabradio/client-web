var BaseCollection = require('../../core/base-collection');

var Queue = require('../models/models-queue');

module.exports = BaseCollection.extend({

	request: 'queues/1/tracks',

	model: Queue,

	initialize: function(){
		this.on('remove', function(model){
			console.log(model);
		});
	}
	
});