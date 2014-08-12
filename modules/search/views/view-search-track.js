var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

	tagName: 'li',
	template: require('../templates/view-search-tracks.hbs'),

	events:{
		"click [role='add-to-queue']" : "_addToQueue"
	},	

	_addToQueue:function(){
		
		/*
		_addToQueue
		PAYLOAD object accepts source_id, source_type
		Triggers a queue:add event with payload and id
		*/

		var payload = {
			source_id: this.model.get('source_id'),
			source_type: this.model.get('source_type')
		};

		dispatcher.trigger('queue:add', payload, null);

	}
});