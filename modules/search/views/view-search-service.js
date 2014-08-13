var Marionette 			= require('backbone.marionette'),
	SearchTrackView 	= require('./view-search-track'),
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

	//TODO: pagination logic

	paginate:function(event){
		event.preventDefault();
		//this.search({ url: event.currentTarget.href });
	}
});


module.exports = SearchServiceView;