var SearchCollection = require('../collections/collections-search');
var SearchTrackView = require('./view-search-track');
var _ = require('underscore');

module.exports = Backbone.View.extend({

	el: null,
	tagName: 'li',

	events: {
		'click .pagination a' : 'paginate'
	},

	pagination_template: require('../templates/pagination.hbs'),

	initialize: function(options){
		this.service = options.service;
		this.collection = new SearchCollection();
		this.listenTo(this.collection, 'add', this.addTrack, this);

		dispatcher.on('search:change-service', this.changeService, this);
		dispatcher.on('perform-search', this.performSearch, this);
	},

	updatePagination:function(resp){
		this.$el.find('.pagination').html( this.pagination_template({ 
			next: resp.next,
			prev: resp.previous
		}));
	},

	changeService:function(service){
		var fn = this.$el.data().service == service ? 'show' : 'hide';
		this.$el[fn]();
	},

	paginate:function(event){

		event.preventDefault();
		this.search({ url: event.currentTarget.href });
	},

	search:function(options){

		this.$el.find('.results').empty();

		var fetch = this.collection.fetch(options);
		fetch.done(this.updatePagination.bind(this));

	},	

	performSearch:function(payload){

		this.search({service: this.service, query: payload});

	},	

	addTrack:function(track){

		var trackView = new SearchTrackView({model: track});

		this.$el.find('.results').append(trackView.render().$el);
	}
});