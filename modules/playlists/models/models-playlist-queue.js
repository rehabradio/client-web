module.exports = Backbone.Model.extend({
	defaults: {
	},

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	}
});