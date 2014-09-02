module.exports = Backbone.Model.extend({
	defaults: {
		id: null,
		name: null,
		description: null,
		coverart: []
	},

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	}
});