var SearchLayout = Marionette.LayoutView.extend({

	el: '#search-results',

	template: require('../../templates/layout.hbs'),

	initialize: function(options){
		this.activeService = options.defaultService;
	},

	regions: {
		results: '.results'
	},

	events: {
		'click a[data-service]' : 'changeService'
	},
	
	changeService: function(e){

		this.$el.find('a').removeClass('is-active');
		$(e.currentTarget).addClass('is-active');

		this.activeService = $(e.currentTarget).data('service');
		dispatcher.trigger('search:service:switch', this.activeService);

	}
});

module.exports = SearchLayout;