module.exports = Marionette.ItemView.extend({

	tagName: 'li',

	template: require('../templates/view-queues-item.hbs'),

	events: {
		'click button': '_loadSelectedQueue'
	},

	_loadSelectedQueue: function(){

		var id = this.model.get('id');

		dispatcher.trigger('queue:change', id);
	}
});