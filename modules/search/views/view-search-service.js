var SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty');

module.exports = Marionette.CompositeView.extend({

	childView: SearchTrackView,

	childViewContainer: '.tracks',

	paginationClass: '.pagination',
	
	emptyView: EmptyView,

	template: require('../templates/search-service.hbs'),

	// templates :{
	// 	pagination: require('../templates/pagination.hbs'),
	// 	view : require('../templates/search-service.hbs')
	// },

	events: {
		'click .pagination a' : 'paginate'
	},

	initialize: function(){
		// this.template = this.templates.view;
	},

	// onRender: function(){

	// 	this.updatePagination( this.collection.pagination );
 //  	},

	// updatePagination:function( pages ){

	// 	this.$el.find( this.paginationClass ).html( this.templates.pagination( pages ) );
	// },

	// paginate:function(event){
		
	// 	event.preventDefault();
	// 	var fetch = this.collection.fetch({ url: event.currentTarget.href});
	// 	fetch.done(this.updatePagination.bind(this));
	// }
});