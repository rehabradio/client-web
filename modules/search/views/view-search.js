var Marionette 	= require('backbone.marionette');

var SearchView = Marionette.ItemView.extend({

	el: '#search',
	template: false,

	ui: {
		input: '.search-field'
	},

	events: {
  		"submit": "onSubmit"
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