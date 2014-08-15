var Backbone = require('backbone');
var AuthToken = require('./tempAuth');

var BaseCollection = Backbone.Collection.extend({


	model: null,

	url: function(){
		return window.API_ROOT + this.request + "/";
	},
	
	parse: function(res){
		return res.results;
	},

	sync:function(method, model, options){
		options.beforeSend = function (xhr) {
    		xhr.setRequestHeader('X_GOOGLE_AUTH_TOKEN', "AuthToken");
  		};
  		return Backbone.Collection.prototype.sync.apply(this, arguments);	
	}

});

module.exports = BaseCollection;