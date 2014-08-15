
var	SearchServiceView 	= require('./view-search-service');
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

	onSubmit:function(e){

		e.preventDefault();
		var query = $.trim( $(e.currentTarget).find( this.ui.input ).val() );

		if(! query.length ){
			return;
		}

		dispatcher.trigger('perform-search', query);
	}
});

module.exports = SearchView;