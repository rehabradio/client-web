var SearchTrackView 	= require('./view-search-track'),
	EmptyView    		= require('./view-empty'),
	ViewPagination		= require('./view-pagination');

module.exports = Marionette.CompositeView.extend({

	childView: SearchTrackView,

	childViewContainer: '.tracks',

	paginationClass: '.pagination',
	
	emptyView: EmptyView,

	template: require('../templates/search-service.hbs'),

	events: {
		'click .pagination button' : '_onPaginate'
	},

	initialize: function(){
		this.listenTo(this.collection, 'sync', this._onSync, this);
	},

	onRender: function(){
		
		//offset till render is complete

		setTimeout(function(){

			// var height = window.innerHeight - this.el.parentNode.offsetTop - 200;

			// this.el.querySelector('.tracks').style.height = height + 'px';

			var viewPagination = new ViewPagination({
				el: this.el.querySelector('.pagination'),
				collection: this.collection
			});
		}.bind(this));
	},

	_onPaginate: function(e){

		this.el.parentNode.classList.add('searching');

		if(e.currentTarget.classList.contains('previous')){
			this.collection.trigger('search:page:previous');
		}else{
			this.collection.trigger('search:page:next');
		}
	},

	_onSync: function(){

		this.el.querySelector('.tracks').scrollTop = 0;

		this.el.parentNode.classList.remove('searching');
		this.el.parentNode.classList.remove('initial');
	}
});