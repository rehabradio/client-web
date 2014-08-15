var BaseCollection = require('../../core/base-collection');

module.exports = BaseCollection.extend({

	request: 'queues/',

	model: require('../models/models-queues'),

	initialize: function(){
		this.on('remove', function(model){
			console.log(model);
		});
	}
	
});