module.exports = Marionette.LayoutView.extend({

	template: require('../templates/view-queues.hbs'),

	className: 'queue',

	initialize: function(options){	
		this.regions = options.regions;
		dataStore.queueTracksCollections = [];
	},
});