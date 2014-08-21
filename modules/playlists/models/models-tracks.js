module.exports = Backbone.Model.extend({
	defaults: {
		id: null
	},

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	}
});