var SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty');

var SearchServiceView = Marionette.CompositeView.extend({

	childView: SearchTrackView,
	childViewContainer: '.results',
	paginationClass: '.pagination',
	emptyView: EmptyView,

	templates :{
		pagination: require('../templates/pagination.hbs'),
		view : require('../templates/search-service.hbs')
	},

	events: {
		'click .pagination a' : 'paginate'
	},

	initialize: function(){
		this.template = this.templates.view;
	},

	onRender: function(){
		console.log('onRender');
		this.updatePagination( this.collection.pagination );
  	},

	updatePagination:function( pages ){
		this.$el.find( this.paginationClass ).html( this.templates.pagination( pages ) );
	},

	paginate:function(event){
		event.preventDefault();
		var fetch = this.collection.fetch({ url: event.currentTarget.href});
		fetch.done(this.updatePagination.bind(this));
	}
});


module.exports = SearchServiceView;