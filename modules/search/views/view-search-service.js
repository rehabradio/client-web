var Marionette 			= require('backbone.marionette'),
	SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty');

var SearchServiceView = Marionette.CompositeView.extend({

	childView: SearchTrackView,
	childViewContainer: '.results',
	emptyView: EmptyView,

	pagination_template: require('../templates/pagination.hbs'),

	events: {
		'click .pagination a' : 'paginate'
	},

	template: require('../templates/search-service.hbs'),

	initialize: function(opts){

		this.pagination = opts.pagination;

		/*
		this.render() triggers onRenderCollection and onRender twice
		https://github.com/marionettejs/backbone.marionette/issues/287

		*/

		this.once('render');
	},

	onRenderCollection: function(){
		this.updatePagination( this.collection.pagination );
  	},

	updatePagination:function( data ){
		this.$el.find('.pagination').html(this.pagination_template(data));
	},

	paginate:function(event){
		event.preventDefault();
		var fetch = this.collection.fetch({ url: event.currentTarget.href});
		fetch.done(this.updatePagination.bind(this));
	}
});


module.exports = SearchServiceView;