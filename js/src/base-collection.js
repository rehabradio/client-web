var Backbone = require('backbone');

var BaseCollection = Backbone.Collection.extend({

	API_ENDPOINT: 'http://localhost:8000/api/',
	model: null,
	
	initialize:function(){
		//construct the url 
		this.url = this.API_ENDPOINT + this.request;
	},

	parse: function(res){
		return res.results;
	}

});

module.exports = BaseCollection;