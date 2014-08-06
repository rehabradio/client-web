var SearchServiceView = require('./view-search-service');

var SearchView = Backbone.View.extend({

	el: '#search',
	searchField: '.search-field',

	events: {
  		"submit": "onSubmit",
  		"click input[type='checkbox']": "onServiceSelect"
	},

	services: {
		spotify: '.search-spotify',
		soundcloud: '.search-soundcloud'
	},

	views: [],

	initialize: function(){
		console.log('SearchView::initialize');

		for(var service in this.services){
			this.views.push( new SearchServiceView({
				el: this.services[service], service: service
			}));
		}
	},

	onServiceSelect:function(e){

		var service = e.currentTarget.name;
		this.services[service] == e.currentTarget.checked;

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