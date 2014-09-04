var LoginView = require('../views/view-login'),
    Auth = require('../../core/auth');

module.exports = Marionette.Controller.extend({
    initialize: function(){

    	// this.MainLayout = options.MainLayout;
    	this.view = new LoginView();	
    	
    	// this.MainLayout.main.show( this.loginView );

    	this.setUpListeners();

   	},

    show: function(){
      return this.view;
    },

   	setUpListeners:function(){
   		this.listenTo(this.view, 'gapi.auth.signIn',  this._onSignIn);
    	this.listenTo(dispatcher, 'gapi.auth.signOut', this._onSignOut);
   	},

   	_onSignIn: function(){

      console.log('called on signIn');

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