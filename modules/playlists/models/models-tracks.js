module.exports = Backbone.Model.extend({
	defaults: {
		id: null
	},

	initialize: function(options){
		this.url = options.url;
		this.fetch();
	}
	// url: function(){
	// 	return Backbone.Model.prototype.url.call(this) + '/';
	// }
});