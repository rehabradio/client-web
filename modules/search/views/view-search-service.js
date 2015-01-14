var SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty'),
	ViewPagination		= require('./view-pagination');

module.exports = Marionette.CompositeView.extend({

	childView: SearchTrackView,

	childViewContainer: '.tracks tbody',

	paginationClass: '.pagination',
	
	emptyView: EmptyView,

	template: require('../templates/search-service.hbs'),

	events: {
		'click .pagination button' : '_onPaginate'
	},

	initialize: function(){

	},

	onRender: function(){
		

		//offset till render is complete

		setTimeout(function(){

			var height = window.innerHeight - this.el.offsetTop - 200;

			this.el.querySelector('.tracks').style.height = height + 'px';

			var viewPagination = new ViewPagination({
				el: this.el.querySelector('.pagination'),
				collection: this.collection
			});
		}.bind(this));
	},

	_onPaginate: function(e){

		if(e.currentTarget.classList.contains('previous')){
			this.collection.trigger('search:page:previous');
		}else{
			this.collection.trigger('search:page:next');
		}
	}
});