var LoginView = require('../views/view-login');
//     Auth = require('../../core/auth');


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
        this._onSignIn();
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
            callback: this._checkLoginStatus.bind(this)
        });

    },

    _onSignOut: function(){        
        gapi.auth.signOut();
        window.location.reload();
    },

    _checkLoginStatus: function(res){

        if(!res.status.signed_in){
            this.trigger('login:status:signedout');
            
        }else{
            if(res.status.method === 'PROMPT'){
                this._getUserData();
            }
        }
    },

    _getUserData: function(){
        // $.ajaxSetup({
        //     headers: { "X_GOOGLE_AUTH_TOKEN": gapi.auth.getToken().access_token }
        // });
        gapi.client.load('plus', 'v1', this._onClientLoad.bind(this));

    },

    _onClientLoad: function(){
        gapi.client.plus.people.get( {'userId' : 'me'} ).execute(this._authorizeUsers.bind(this));
    },

    _authorizeUsers: function(res){

        for(var i in res.emails){
            // If one of the emails stored on the users google+ account is a rehabstudio
            if(/@rehabstudio\.com/.test(res.emails[i].value)){
                // initialise the app
                this.trigger('login:status:signedin', res.result);
                break;
            }else{
                alert('Must have an @rehabstudio.com email address to sign in');
                // Not a member of @rehabstudio.com
            }
        }
    }
});