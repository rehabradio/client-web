var LoginView = require('../views/view-login'),
    Auth = require('../../core/auth');


// #################################################
// #                                               #
// #                                               #
// #    Note: Sign-out doesn't work on localhost   #
// #                                               #
// #                                               #
// #################################################

module.exports = Marionette.Controller.extend({
    initialize: function(){

        this.view = new LoginView();    
        
        this.setUpListeners();

    },

    show: function(){
      return this.view;
    },

    setUpListeners:function(){
        this.listenTo(this.view, 'gapi:auth:signIn',  this._onSignIn);
        this.listenTo(dispatcher, 'gapi:auth:signOut', this._onSignOut);
    },

    _onSignIn: function(){

        gapi.auth.signIn({
            callback: function(res){
                debugger;
            }
            // callback: function(result){
            //     new Auth(result);
            // }
        });

    },

    _onSignOut: function(){        
        gapi.auth.signOut();
        window.location.reload();
    }

});