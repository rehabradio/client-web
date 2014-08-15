var SearchLayout = Marionette.LayoutView.extend({

	el: '#search-results',

	template: require('../../templates/layout.hbs'),

	regions: {
		results: '.results'
	},

	events: {
		'click a[data-service]' : 'changeService'
	},

	changeService: function(e){
		var service = $(e.currentTarget).data('service');
		dispatcher.trigger('service:switch', service);
	}
});

module.exports = SearchLayout;