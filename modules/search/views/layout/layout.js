var SearchLayout = Marionette.LayoutView.extend({

	el: '#search-results',

	template: require('../../templates/layout.hbs'),

	regions: {
		results: '.search-results'
	},

	events: {
		'click a[data-service]' : 'changeService'
	},
	
	changeService: function(e){
		var service = $(e.currentTarget).data('service');
		this.swapRegion( service );	
	},

	swapRegion: function( service ){

		//simple tab interface to toggle between service regions
		//hide all regions
		this.hideRegions();

		//show this region
		this[service].$el.show();
	},

	changeService: function(e){
		var service = $(e.currentTarget).data('service');
		dispatcher.trigger('service:switch', service);
	}
});

module.exports = SearchLayout;