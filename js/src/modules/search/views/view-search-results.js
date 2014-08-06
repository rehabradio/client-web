var SearchServiceView = require('./view-search-service');
var _ = require('underscore');

var SearchResultsView = Backbone.View.extend({

	el: '#search-results',

	events: {
		"click [role='tabs'] a": "changeService"
	},

	services: {
		spotify: '.search-spotify',
		soundcloud: '.search-soundcloud'
	},

	views: {},

	initialize: function(){

		console.log('initialize SearchResultsView');

		for(var service in this.services){

			if(!this.views[service]){
				this.views[service] = [];
			}

			this.views[service].push( new SearchServiceView({ el: this.services[service], service: service }));
		}

	},

	changeService:function(e){
		e.preventDefault();
		
		var service = $(e.currentTarget).data().service;
		dispatcher.trigger('search:change-service', service);

	},

});

module.exports = SearchResultsView;