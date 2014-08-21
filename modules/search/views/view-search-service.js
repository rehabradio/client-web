var SearchTrackView = require('./view-search-track');

module.exports = Marionette.CompositeView.extend({

	childView: SearchTrackView,
	childViewContainer: '.results',
	template: require('../templates/search-service.hbs'),
	paginationClass: '.pagination',
	pagination: require('../templates/pagination.hbs'),

	ui:{
		controls: '.pagination a'
	},
	
	events: {
    	'click @ui.controls': 'paginate'
  	},

	onRender: function(){
		this.updatePagination( this.collection.pagination );
  	},

	updatePagination:function( pages ){
		this.$el.find( this.paginationClass ).html( this.pagination( pages ) ); //could be improved
	},

	paginate:function(event){
		event.preventDefault();
		var fetch = this.collection.fetch({ url: event.currentTarget.href });
		fetch.done(this.updatePagination.bind(this));
	}
});