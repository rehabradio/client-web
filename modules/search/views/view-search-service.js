var Marionette 			= require('backbone.marionette'),
	SearchCollection	= require('../collections/collections-search'),
	SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty');

var SearchServiceView = Marionette.CompositeView.extend({

	childView: SearchTrackView,
	childViewContainer: '.results',
	emptyView: EmptyView,

	events: {
		'click .pagination a' : 'paginate'
	},

	pagination_template: require('../templates/pagination.hbs'),
	template: require('../templates/search-service.hbs'),

	initialize: function(options){

		console.log('SearchServiceView::initialize');
	
		for(var opts in options){
			this[opts] = options[opts];
		}

		this.collection = new SearchCollection();
		this.setUpListeners();

		this.render();
	},

	setUpListeners:function(){

		dispatcher.on('search:change-service', this.changeService, this);
		dispatcher.on('perform-search', this.performSearch, this);

	},

	updatePagination:function(resp){
		//this.$el.find('.pagination').html( this.pagination_template({ 
		//	next: resp.next,
		//	prev: resp.previous
		//}));
	},

	paginate:function(event){
		event.preventDefault();
		this.search({ url: event.currentTarget.href });
	},

	search:function(options){

		this.$el.find('.results').empty();

		var fetch = this.collection.fetch(options);
		//fetch.done(this.updatePagination.bind(this));

		//always hide the ajax spinner after fetch 

		/*fetch.always(function(){
			this.hideLoader();
		}.bind(this));*/

	},	

	performSearch:function(payload){

		this.search({service: this.service, query: payload});

	},	
});


module.exports = SearchServiceView;