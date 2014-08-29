var LoginView = require('./views/login'),
    Auth = require('../core/auth');

module.exports = Marionette.Controller.extend({
    initialize: function(options){

    	this.MainLayout = options.MainLayout;
    	this.loginView = new LoginView();	
    	
    	this.MainLayout.main.show( this.loginView );

    	this.setUpListeners();

   	},

   	setUpListeners:function(){
   		this.listenTo(this.loginView, 'gapi.auth.signIn',  this._onSignIn);
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