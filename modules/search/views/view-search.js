var	SearchServiceView 	= require('./view-search-service'),
	//SearchVM			= require('./view-search-vm'),
	Marionette 			= require('backbone.marionette'),
	Layout 				= require('./layout/layout'),
	_					= require('underscore');

var SearchView = Marionette.ItemView.extend({

	el: '#search',
	template: false,

	ui: {
		input: '.search-field'
	},

	events: {
  		"submit": "onSubmit"
	},

	subViews: {},
	services: ['spotify', 'soundcloud'],

	initialize: function(){

		/*
		Needs improved
		this.layout.service.show() currently destroys any views before displaying a new view
		*/

		//dispatcher.on('search:switchLayout', this.swapLayout, this);

		this.layout = new Layout();
		this.layout.render();

		//looping over each service and create a new service view.
		
		_.each(this.services, function(service){
			this.layout[service].show(  new SearchServiceView({service: service, className: service })  );
		}, this)
	},

	onSubmit:function(event){

		event.preventDefault();
		var query = $.trim( $(event.currentTarget).find( this.ui.input ).val() );

		if(! query.length ){
			return;
		}

		dispatcher.trigger('perform-search', query);
	}
});

module.exports = SearchView;