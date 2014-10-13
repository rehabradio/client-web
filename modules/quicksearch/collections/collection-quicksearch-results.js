var BaseCollection = require('../../core/base-collection');

ModelQuicksearchResults = require('../models/model-quicksearch-results');

module.exports = BaseCollection.extend({

	model: ModelQuicksearchResults,

	events:{
		'click .quicksearch-show-all': '_onQuicksearchShowAll'
	},

	url: function(){
		return window.API_ROOT + 'metadata/search/' + this.service + '/?q=' + this.query; 
	},

	parse: function(data){
	
		data.results.length -= data.results.length - 3;
		return data.results;
	},

	update: function(query){
		this.query = query;
		this.fetch();
	},

	_onQuicksearchShowAll: function(){
		dispatcher.trigger('navigation:changemodule', 'search', this.query);
	}
});