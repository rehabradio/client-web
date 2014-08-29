/*
------------------------
Google Auth
------------------------
USAGE:
gapi.auth.signIn({
	callback: function(result){
		new Auth(result);
	}
});
------------------------

*/

var Auth = function(res){


	var status 		= res.status,
		signed_in 	= status.signed_in,
		method 		= status.method;


	
	this.setUpAjax = function(){
		$.ajaxSetup({
			headers: { "X_GOOGLE_AUTH_TOKEN": gapi.auth.getToken().access_token }
		});
	};


	this.startAuth = function(){
		gapi.client.load('plus', 'v1', this.onClientLoad.bind( this ) );
	};


	this.onClientLoad = function(){
		gapi.client.plus.people.get( {'userId' : 'me'} ).execute( this.authorizeUsers.bind(this) );
	};


	this.authorizeUsers = function(res){
		var emails = _.where(res.emails, function(element){ return /@rehabstudio\.com/g.match(element.value); });

		for(var i in res.emails){
			// If one of the emails stored on the users google+ account is a rehabstudio
			if(/@rehabstudio\.com/.test(res.emails[i].value)){
				// initialise the app
				dispatcher.trigger('login-set-status', true, res.result);
			}
		}
	};	


	if( signed_in && method === 'PROMPT' || method ==='AUTO'){
		this.setUpAjax();
		this.startAuth();
	}


};

module.exports = window.authoriseUser = Auth