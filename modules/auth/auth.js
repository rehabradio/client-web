var Model = Backbone.Model.extend({
	defaults: {
		signedin: null,
		profile: null
	}
});

module.exports = Marionette.Object.extend({

	model: new Model(),

    gettingUserData: false,

    hasUserData: false,

	initialize: function(){

		this.listenTo(this.model, 'change:signedin', this.onStatusChange, this);
	    this.signin();
	    this.listenTo(this, 'auth:signin', this.signin, this);
	    this.listenTo(this, 'auth:signout', this.signout, this);
	},

    signin: function(){

		gapi.auth.signIn({callback: this.checkLoginStatus.bind(this)});
	},

    signout: function(){

        gapi.auth.signOut();
    },

    checkLoginStatus: function(res){

        if(!res.status.signed_in){
            this.model.set('signedin', false);
        }else{
            if(!this.gettingUserData){
                this.getUserData();
            }
        }
    },

    getUserData: function(){

        this.gettingUserData = true;

        if(!this.hasUserData){
            gapi.client.load('plus', 'v1', this.onClientLoad.bind(this));
        }
    },

    onClientLoad: function(){
        this.hasUserData = true;

        gapi.client.plus.people.get( {'userId' : 'me'} ).execute(this.authoriseUsers.bind(this));
    },

    authoriseUsers: function(res){

        for(var i in res.emails){
            // If one of the emails stored on the users google+ account is a rehabstudio
            if(/@rehabstudio\.com/.test(res.emails[i].value)){
                // initialise the app

                this.model.set('profile', res);
                this.model.set('signedin', true);
                break;
            }else{
                alert('Must have an @rehabstudio.com email address to sign in');
                // Not a member of @rehabstudio.com
            }
        }
    },

    onStatusChange: function(){
    	if(this.model.get('signedin')){
    		this.trigger('auth:status:signedin');

    	}else{
            this.hasData = false;
            this.trigger('auth:status:signedout');

    	}
    }
});