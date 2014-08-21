var BaseCollection = Backbone.Collection.extend({
	
	model: null,

	url: function(){
		return window.API_ROOT + this.request + "/";
	},
	
	parse: function(res){
		return res.results;
	},

	initialize: function(){
		
		this.poll();
	},

	poll: function(){

		// var self = this;

		// setTimeout(function(){

		// 	self.fetch({
		// 		success: function(){
		// 			∂self.poll();

		// 		}
		// 	});
		// }, 2000);
	}

});

module.exports = BaseCollection;