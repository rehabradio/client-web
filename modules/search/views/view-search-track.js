module.exports = Backbone.View.extend({

	template: require('../templates/view-search-tracks.hbs'),

	events:{
		"click [role='add-to-queue']" : "_addToQueue"
	},	

	initialize: function(){
		console.log(this.model);
		this.setElement(this.template(this.model.toJSON()));
	},

	_addToQueue:function(){
		console.log(this.model.get('source_id'));
	},

	render: function(){
		return this;
	}

});