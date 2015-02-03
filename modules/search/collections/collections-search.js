var BaseCollection = require('../../core/base-collection');

var SearchModel = require('../models/models-search');

/*

Example request using search

http://rehabradio.vagrant.local:8000/api/metadata/search/soundcloud/?q=narsti

*/

var SearchCollection = BaseCollection.extend({

	SEARCH_ENDPOINT: 'metadata/search/',

	model: SearchModel,

	request: 'search',

	page: 1,

	fetch:function(options){
		// if(!options.url){
		// 	this.url = window.API_ROOT + this.SEARCH_ENDPOINT + this.service + "/?q=" + this._getQuery() + '&page=' + this.page;
		// }
		return Backbone.Collection.prototype.fetch.call(this, options);

	},

	url: function(){
		return window.API_ROOT + this.SEARCH_ENDPOINT + this.service + "/?q=" + this._getQuery() + '&page=' + this.page;
	},

	parse:function(response){

		if(response.query !== decodeURI(this._getQuery())){
			// Prevents race condition errors caused when search responses are returned a different order from when they are sent.
			return;
		}

		this.pages = Math.floor(response.count / 20);
		return response.results;
	},

	initialize: function(models, options){

		this.service = options.service;

		this.listenTo(this, 'search:page:previous', this._onPageDecrement, this);
		this.listenTo(this, 'search:page:next', this._onPageIncrement, this);
	},

	_onPageDecrement: function(){
		this.page = Math.max(1, --this.page);
		this.fetch();
	},

	_onPageIncrement: function(){
		this.page = Math.min(this.pages, ++this.page);
		this.fetch();
		var query = this._getQuery();

	},
	
	_getQuery: function(){

        var query = '',
            searchParams = location.search.replace('?', '').split('&'),
            params = {};

        for(var i in searchParams){
            params[searchParams[i].split('=')[0]] = searchParams[i].split('=')[1];
        }

        if(params.query){
            query = params.query;
        }

        return query;

    }
});

module.exports = SearchCollection;