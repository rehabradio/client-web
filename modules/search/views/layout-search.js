var Model = Backbone.Model.extend({
	defaults: {
		services: window.services
	}
});

module.exports = Marionette.LayoutView.extend({

	tagName: 'section',
	
	id: 'search-results',

	className: 'module-search',

	template: require('../templates/layout-search.hbs'),

	model: new Model(),

	initialize: function(options){

		this.regions = options.regions;
	},

	
});