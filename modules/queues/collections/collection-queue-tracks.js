var BaseCollection = require('../../core/base-collection');

var QueueTrack = require('../models/models-queue-tracks');

module.exports = BaseCollection.extend({

	model: QueueTrack,

	url: null,

	initialize: function(models, options){
		
		this.url = options.url;
		this.id = Number(options.id);

		dispatcher.on('socket:queues:tracks:update', this.update.bind(this));

		this.fetch();
	},

	comparator: function(element){
		return element.id;
	},


	update: function(data){

		/*
		 *	Checks if the collection 'id' corresponds to the 'id' supplied in the data
		 */

		if(data.id === this.id){
			this.set(data, {parse: true});
		}
	}
	
});