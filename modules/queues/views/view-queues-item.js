module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-queues-item.hbs'),

	events: {
		'click button': '_loadSelectedQueue'
	},

	_loadSelectedQueue: function(){
		console.log();

		var id = this.model.get('id');

		dataStore.queueTracksCollection.queueId = id;

		dispatcher.trigger('queue:reset', id)
	}
});