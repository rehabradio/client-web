module.exports = function(){
	sessionParams = {
		'client_id': '263513175105-o8beutglcacde1pv5k6k6hnq0d0g1v53.apps.googleusercontent.com',
		'session_state': null
	};
	
	gapi.auth.checkSessionState(sessionParams, function(stateMatched) { 

		if (stateMatched == true) { 
			console.log("You be logged out"); 
		} else { 
			console.log("You be logged in"); 
		}
	});
} 

// var init = function(){
// 	var additionalParams = {
// 		'callback': signinCallback,
// 		'scope': 'https://www.googleapis.com/auth/plus.login email'
// 	};

// 	gapi.auth.signIn(additionalParams);

// }

function signinCallback(authResult){
	gapi.client.load('plus', 'v1', function() {
		gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(res) {

			var emails = _.where(res.emails, function(element){ return /@rehabstudio\.com/g.match(element.value); });
			_.each(emails, function(element){
				if(/@rehabstudio\.com/.test('@rehabstudio.com')){
					console.log('authorise');
					var appView = new AppView();
					return;
				}else{
					console.log('not a rehabstudio email');
				}
			});
		})
	});
}