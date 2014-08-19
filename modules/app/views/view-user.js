var modelApp = require('../models/models-app');

module.exports = Backbone.View.extend({

	el: '#user',

	template: require('../templates/user.hbs'),

	events: {
		'click #log-in': '_onSignIn',
		'click #log-out': '_onSignOut',
	},

	model: modelApp,

	initialize: function(){

		this.listenTo(this.model, 'change:loginStatus', this.render);

		this.render();
	},

	render: function(){

		this.$el.empty().html(this.template(this.model.toJSON()));

		return this;
	},

	_onSignIn: function(){

		gapi.auth.signIn({
			callback: 'authoriseUser'
		});
	},

	_onSignOut: function(){
		
		gapi.auth.signOut();
		window.location.reload();

		// FORCES TOKEN REMOVAL

		// $.ajax({
		// 	url: 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token,
		// 	dataType: 'JSONP',
		// 	success: function(){
				// gapi.auth.signOut();
				// window.location.reload();
		// 	}
		// });

	}
});