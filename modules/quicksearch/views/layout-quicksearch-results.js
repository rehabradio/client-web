module.exports = Marionette.LayoutView.extend({

	template: require('../templates/layout-quicksearch-results.hbs'),
	
	events:{
		'click .quicksearch-show-all': '_onQuicksearchShowAll'
	},

	initialize: function(){

		var model = Backbone.Model.extend();
		var services = [];

		for(var i in window.services){
			services.push({service: window.services[i]});
		}

		this.model = new model({services: services});


		this.render();

	},

	/**
	 * Called on the '+ Show All' click event. Loads the 'search' module.
	 *
	 * @function _onQuicksearchShowAll
	 * @memberOf CollectionQuicksearchResults
	 * @protected
	 */
	_onQuicksearchShowAll: function(){
		
		dispatcher.trigger('navigation:changemodule', 'search', this.query);
	}
});