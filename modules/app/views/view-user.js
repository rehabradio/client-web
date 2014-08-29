var modelApp = require('../../login/models/models-app');

module.exports = Marionette.ItemView.extend({

	model: modelApp,

	template: require('../templates/user.hbs'),

	events: {
		'click #log-out': '_onSignOut',
	},

	initialize: function(){
		this.listenTo(this.model, 'change:loginStatus', this.render);
	},

	_onSignOut: function(){
		dispatcher.trigger('gapi.auth.signOut');
	}
});