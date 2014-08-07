var SearchServiceView = require('./view-search-service');

var SearchView = Backbone.View.extend({

	el: '#search',
	searchField: '.search-field',

	events: {
  		"submit": "onSubmit",
  		"click input[type='checkbox']": "onServiceSelect"
	},

	services: {
		spotify: true,
		soundcloud: false
	},

	views: [], // stores view refereneces

	initialize: function(){
		console.log('SearchView::initialize');

		for(var service in this.services){
			var viewEl = '.searchService-' + service;
			this.views.push( new SearchServiceView({el: viewEl, service: service}) ) ;
		}
	},

	onServiceSelect:function(e){

		var service = e.currentTarget.name;
		this.services[service] = e.currentTarget.checked;

	},

	onSubmit:function(event){

		// trigger an event when searching when cleans previous views 
		//dispater.trigger('searchView-cleanup');

		/*
			TODO
			emit search event and pass query
			Instantiate a new view depending on if the service is selected or not
		*/

		event.preventDefault();
		var query = $.trim( $(event.currentTarget).find( this.searchField ).val() );

		if(! query.length ){
			return;
		}

		dispatcher.trigger('perform-search', query);

	}
});

module.exports = SearchView;