

module.exports = Marionette.ItemView.extend({


	template: require('../templates/view-profile-info.hbs'),

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},

	onRender: function(){
	}
})