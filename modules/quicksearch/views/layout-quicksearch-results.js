module.exports = Marionette.LayoutView.extend({

	template: require('../templates/layout-quicksearch-results.hbs'),
	
	initialize: function(){

		var model = Backbone.Model.extend();
		var services = [];

		for(var i in window.services){
			services.push({service: window.services[i]});
		}

		this.model = new model({services: services});


		this.render();

	}
});