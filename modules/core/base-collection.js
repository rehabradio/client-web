var BaseCollection = Backbone.Collection.extend({
	
	model: null,

	url: function(){
		return window.API_ROOT + this.request + "/";
	},
	
	parse: function(res){
		return res.results;
	},

});

module.exports = BaseCollection;