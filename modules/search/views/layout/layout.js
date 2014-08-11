var Marionette = require('backbone.marionette');

var SearchLayout = Marionette.LayoutView.extend({

	el: '#search-results',

	template: require('../../templates/layout.hbs'),

	regions: {
		service : '.service'
	},

	events: {
		'click a[data-service]' : 'changeService'
	},

	changeService:function(e){
		var service = $(e.currentTarget).data('service')
		dispatcher.trigger('search:switchLayout', service);		
	}

});

module.exports = SearchLayout;