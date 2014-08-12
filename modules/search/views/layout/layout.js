var Marionette 		= require('backbone.marionette'),
	SearchRegion 	= require('../../regions/search');

var SearchLayout = Marionette.LayoutView.extend({

	el: '#search-results',

	template: require('../../templates/layout.hbs'),

	regions: {
		spotify : '.spotify-region',
		soundcloud : '.soundcloud-region'
	},

	events: {
		'click a[data-service]' : 'changeService'
	},

	changeService:function(e){
		var service = $(e.currentTarget).data('service')
		this.swapRegion( service );	
	},

	swapRegion:function( service ){

		//simple tab interface to toggle between service regions
		//hide all regions
		this.hideRegions();

		//show this region
		this[service].$el.show();

	},

	hideRegions:function(){
		for(var region in this.regions){
			this[region].$el.hide();
		}
	}

});

module.exports = SearchLayout;