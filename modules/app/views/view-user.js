module.exports = Marionette.ItemView.extend({

	template: require('../templates/user.hbs'),

	events: {
		'click #log-out': '_onSignOut',
	},

	initialize: function(){
		
		this.listenTo(dataStore.appModel, 'change', this.render, this);
	},

	_onSignOut: function(){
		dispatcher.trigger('auth:signout');
	}
});