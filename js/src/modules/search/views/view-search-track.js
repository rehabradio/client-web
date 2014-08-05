module.exports = Backbone.View.extend({

	template: require('../templates/view-search-tracks.hbs'),

	initialize: function(){
		console.log(this.model);
		this.setElement(this.template(this.model.toJSON()));
	},

	render: function(){
		return this;
	}

});