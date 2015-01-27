var BaseCollection = Backbone.Collection.extend({
	
	model: null,

	url: function(){
		return window.API_ROOT + this.request + "/";
	},
	
	parse: function(res){
		return res.results;
	},

	initialize: function(){
		
		// this.poll();
	},

	poll: function(){

		// var self = this;

		// setTimeout(function(){

		// 	self.fetch({
		// 		success: function(){
		// 			self.poll();

		// 		}
		// 	});
		// }, 2000);
	},

	update: function(){

		/*
		 *	Calls the build in 'set' method that merges the collection from the server with the current one.
		 *	'parse' set as true to use the built in parse function. options 'add', 'remove' and 'merge' set to true by default
		 */

		// this.set(data, {parse: true});
	}

});

module.exports = BaseCollection;