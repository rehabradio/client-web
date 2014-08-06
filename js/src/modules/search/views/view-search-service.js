var SearchCollection = require('../collections/collections-search');
var SearchTrackView = require('./view-search-track');

module.exports = Backbone.View.extend({

	el: null,
	tagName: 'li',

	initialize: function(options){

		console.log(this.$el);

		console.log('SearchServiceView::initialize');

		this.service = options.service;

		this.collection = new SearchCollection();

		this.listenTo(this.collection, 'add', this.addTrack, this);

		dispatcher.on('perform-search', this.performSearch, this);

	},

	performSearch:function(payload){
		this.$el.empty();
		this.collection.fetch({service: this.service, query: payload});
	},	

	addTrack:function(track){

		var trackView = new SearchTrackView({model: track});

		this.$el.append(trackView.render().$el);
	}
});