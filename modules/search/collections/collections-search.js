var BaseCollection = require('../../../js/src/base-collection');

var SearchModel = require('../models/models-search');

/*

Example request using search

http://rehabradio.vagrant.local:8000/api/metadata/search/soundcloud/?q=narsti

*/

var SearchCollection = BaseCollection.extend({

	SEARCH_ENDPOINT: 'metadata/search/',
	model: SearchModel,

	fetch:function(options){
		if(!options.url){
			this.url = this.API_ENDPOINT + this.SEARCH_ENDPOINT + options.service + "/?q=" + options.query;
		}
		return Backbone.Collection.prototype.fetch.call(this, options);
	},

	parse:function(response){
		return response.results;
	}

});

module.exports = SearchCollection;