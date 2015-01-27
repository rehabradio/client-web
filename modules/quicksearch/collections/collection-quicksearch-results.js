/**
* Backbone collection that stores search results
*
* @class CollectionQuicksearchResults
* @extends Quicksearch
*/
var BaseCollection = require('../../core/base-collection');

ModelQuicksearchResults = require('../models/model-quicksearch-results');

module.exports = BaseCollection.extend({

	model: ModelQuicksearchResults,

	/**
	 * Dynamically creates the url for the search query. Overrides built-in 'url' function.
	 *
	 * @memberOf CollectionQuicksearchResults
	 * @function url
	 */
	url: function(){
		return window.API_ROOT + 'metadata/search/' + this.service + '/?q=' + this.query; 
	},

	/**
	 * Uses the results property of the response data and removes all but three of the results. Overrides built-in 'parse' function.
	 *
	 * @function parse
	 * @memberOf CollectionQuicksearchResults
	 * @param {Object} data Response from the server.
	 * @returns {Array}
	 */
	parse: function(data){
	
		data.results.length -= data.results.length - 3;
		return data.results;
	},

	/**
	 * Sets the class property 'query' to the users input to be used in the 'url' function and then calls the built-in fetch method
	 * to retrieve updated results.
	 *
	 * @function update
	 * @memberOf CollectionQuicksearchResults
	 * @param {string} query The search query string.
	 */
	update: function(query){

		this.query = query;
		this.fetch();
	},

});