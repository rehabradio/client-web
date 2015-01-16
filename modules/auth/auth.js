var Model = Backbone.Model.extend({
	defaults: {
		signedin: null,
		profile: null
	}
});

module.exports = Marionette.Controller.extend({

	model: new Model(),

	initialize: function(){
		this.listenTo(this.model, 'change:signedin', this.onStatusChange, this);
	    this.signIn();
	    this.listenTo(this, 'auth:signedin', this.signedin, this);
	    this.listenTo(this, 'auth:signedout', this.signedout, this);
	},

    signIn: function(){
		gapi.auth.signIn({callback: this.checkLoginStatus.bind(this)});
	},

    signOut: function(){     
        gapi.auth.signOut();
        window.location.reload();
    },

    checkLoginStatus: function(res){

        if(!res.status.signed_in){
            this.model.set('signedin', false);
        }else{
            if(res.status.method === 'PROMPT'){
                this.getUserData();
            }
        }
    },

    getUserData: function(){
        gapi.client.load('plus', 'v1', this.onClientLoad.bind(this));

    },

    onClientLoad: function(){
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
    		this.trigger('login:status:signedin');

    	}else{
            this.trigger('login:status:signedout');

    	}
    }
});