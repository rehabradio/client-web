var Model = Backbone.Model.extend();


module.exports = Backbone.View.extend({

	template: require('../templates/pagination.hbs'),

	initialize: function(){

		this.listenTo(this.collection, 'sync', this.render, this);
	},

	render: function(){

		var data = {
			page: this.collection.page,
			pages: this.collection.pages
		}

		this.$el.empty();

		if(data.pages > 1){
			this.$el.append(this.template(data));
		}
	}
});