var SearchResultsView = require('./view-search-results');

var SearchView = Backbone.View.extend({

	el: '#search',
	searchField: '.search-field',

	events: {
  		"submit": "onSubmit"
	},

	initialize: function(){
		new SearchResultsView();
	},

	onSubmit:function(event){

		event.preventDefault();
		var query = $.trim( $(event.currentTarget).find( this.searchField ).val() );

		if(! query.length ){
			return;
		}

		dispatcher.trigger('perform-search', query);

	}
});

module.exports = SearchView;