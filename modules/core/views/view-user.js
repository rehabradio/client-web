var AppModel = require('../models/models-app'),
	Auth  	 = require('../auth/');

module.exports = Marionette.ItemView.extend({

	el: '#user',	
	model: AppModel,

	template: require('../templates/user.hbs'),

	events: {
		'click #log-in': '_onSignIn',
		'click #log-out': '_onSignOut',
	},

	initialize:function(){
		this.render();
	},

	modelEvents: {
    	"change:loginStatus": "render"
  	},

	_onSignIn: function(){
		gapi.auth.signIn({
			callback: function(result){
				new Auth(result);
			}
		});
	},

	_onSignOut: function(){

		gapi.auth.signOut();
		window.location.reload();
	
	}
});