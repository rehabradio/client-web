module.exports = Backbone.Model.extend({

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	}
});