module.exports = Marionette.LayoutView.extend({

	template: require('../templates/view-queues.hbs'),

	className: 'module-queues',

	initialize: function(options){	
		this.regions = options.regions;
	},
});