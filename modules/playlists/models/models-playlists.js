module.exports = Backbone.Model.extend({
	defaults: {
		id: null,
		name: null,
		description: null,
		coverart: null
	},

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	}
});