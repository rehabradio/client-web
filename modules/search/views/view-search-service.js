var SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty');

module.exports = Marionette.CompositeView.extend({

	childView: SearchTrackView,

	childViewContainer: '.tracks',

	paginationClass: '.pagination',
	
	emptyView: EmptyView,

	template: require('../templates/search-service.hbs'),

	events: {
		'click .pagination a' : 'paginate'
	},

	initialize: function(){
	}
});