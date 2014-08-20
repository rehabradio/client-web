module.exports = Backbone.Model.extend({
	defaults: {
		playlist: null
	},

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	}
});