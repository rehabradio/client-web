var SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty');

var SearchServiceView = Marionette.CompositeView.extend({

	childView: SearchTrackView,
	childViewContainer: '.results',
	emptyView: EmptyView,

	events: {
		'click .pagination a' : 'paginate'
	},

	template: require('../templates/search-service.hbs'),

	initialize: function(){
		console.log('SearchServiceView::initialize');
		this.render();
	},

	setUpListeners:function(){

		dispatcher.on('search:change-service', this.changeService, this);
		dispatcher.on('perform-search', this.performSearch, this);

	},

	updatePagination:function(){},

	paginate:function(event){
		event.preventDefault();
		this.search({ url: event.currentTarget.href });
	},

	search:function(options){

		this.$el.find('.results').empty();
		this.collection.fetch(options);
	
	},	

	performSearch:function(payload){

		this.search({service: this.service, query: payload});

	},	
});


module.exports = SearchServiceView;