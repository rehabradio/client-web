module.exports = Marionette.ItemView.extend({

	tagName: 'li',
	template: require('../templates/view-queues-item.hbs'),

	events: {
		'click button': '_loadSelectedQueue'
	},

	_loadSelectedQueue: function(){

		dispatcher.trigger('queue:change', this.model.get('id'));
		dispatcher.trigger('router:triggerController', this.model.get('id'));

	}
});