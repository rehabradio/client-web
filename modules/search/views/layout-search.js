module.exports = Marionette.LayoutView.extend({

	tagName: 'section',
	
	id: 'search-results',

	className: 'search-results',

	template: require('../templates/layout-search.hbs'),

	initialize: function(options){

		this.regions = options.regions;

		// this.activeService = options.defaultService;

		// this.templateHelpers = {
		// 	active: this.activeService
		// };
	},

	// regions: {
	// 	results: '#results',
	// 	modalContainer : '#search-modal'
	// },

	events: {
		'click a[data-service]' : 'changeService'
	},
	
	changeService: function(e){
		
		this.trigger('search:service:change', $(e.currentTarget).data('service'));

		this.$el.find('a').removeClass('is-active');
		$(e.currentTarget).addClass('is-active');

		// this.activeService = $(e.currentTarget).data('service');
		// dispatcher.trigger('service:switch', this.activeService);

	}
});