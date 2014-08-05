var Backbone = require('backbone');
var proxiedSync = Backbone.sync;

var BaseCollection = Backbone.Collection.extend({

	API_ENDPOINT: 'http://localhost:8000/api/',
	model: null,
	
	initialize:function(){
		//construct the url 
		this.url = this.API_ENDPOINT + this.request;
	},

	parse:function(response){
		return response;
	}

});

module.exports = BaseCollection;