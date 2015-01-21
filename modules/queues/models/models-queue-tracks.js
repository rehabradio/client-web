module.exports = Backbone.Model.extend({
	// idAttribute: 'queue_id'

	url: function(){
		return Backbone.Model.prototype.url.call(this) + '/';
	},

	initialize: function(){

		this.listenTo(this, 'add', this._onModelAdd, this);
	}
	
});