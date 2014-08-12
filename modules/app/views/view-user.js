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

		this.listenTo(this.model, 'change', this.render);

		this.render();
	},

	render: function(){

		this.$el.empty().html(this.template(this.model.toJSON()));

		return this;
	},

	_onSignIn: function(){
		console.log('log in');
		gapi.auth.signIn({
			callback: 'authoriseUser'
		});

	},

	_onSignInCallback: function(data){
		console.log(data);
	},

	_onSignOut: function(){
		console.log('log out');
		gapi.auth.signOut();
	}
});