var Backbone = require('backbone');
var AuthToken = require('./tempAuth');

var BaseCollection = Backbone.Collection.extend({

	API_ENDPOINT: 'http://server-core.herokuapp.com/api/',

	model: null,

	url: function(){
		return this.API_ENDPOINT + this.request + "/";
	},
	
	parse: function(res){
		return res.results;
	},

	sync:function(method, model, options){
		options.beforeSend = function (xhr) {
    		xhr.setRequestHeader('X_GOOGLE_AUTH_TOKEN', AuthToken);
  		};
  		return Backbone.Collection.prototype.sync.apply(this, arguments);	
	}

});

module.exports = BaseCollection;