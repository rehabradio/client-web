var	SearchServiceView 	= require('./view-search-service'),
	//SearchVM			= require('./view-search-vm'),
	Layout 				= require('./layout/layout');

var SearchView = Marionette.ItemView.extend({

	el: '#search',
	template: false,

	ui: {
		input: '.search-field'
	},

	events: {
  		"submit": "onSubmit"
	},

	subViews: {}, services: ['spotify', 'soundcloud'],

	renderLayout:function(){
		this.layout = new Layout();
		this.layout.render();

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

		this.renderLayout();
		dispatcher.trigger('perform-search', query);
	}
});

module.exports = SearchView;