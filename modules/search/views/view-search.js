var SearchResultsView = require('./view-search-results');

var SearchView = Backbone.View.extend({

	el: '#search',
	searchField: '.search-field',

	events: {
  		"submit": "onSubmit"
	},

	initialize: function(){
		this.SearchResultsView = new SearchResultsView();
		this.SearchResultsView.$el.hide();
	},

	onSubmit:function(event){

		event.preventDefault();
		var query = $.trim( $(event.currentTarget).find( this.searchField ).val() );

		if(! query.length ){
			return;
		}

		dispatcher.trigger('perform-search', query);
		this.SearchResultsView.$el.show();
	}
});

module.exports = SearchView;