/*
 *	Require global librarys and put them on the global scope
 */

Backbone = require('backbone');
_ = require('underscore');
$ = jQuery = require('jquery');

/*
 *	Tell Backbone to use jQuery
 */

Backbone.$ = $;



/*
 *	Put Marionette and Handlebars on the global namespace
 */

Marionette = require('backbone.marionette');
Handlebars = require('hbsfy/runtime');

// require('./libs/backbone.subroute.js');
require('./libs/backbone.marionette.subrouter.js');

/*
 *	Utils:
 *		dispatcher: Globel event hooks
 *		dataStore: Store for collections so that data can be shared between modules
 *		router: Bend the URL to your will with the power of Backbone Routing
 */

dispatcher = require('./src/utils/dispatcher');
dataStore = require('./src/utils/dataStore');
//router = require('./src/utils/router');

/*
 *	Use Mock data by including the 'debug' param in the URL
 */

if(document.location.search.match(/debug/gi)){
	var tests = require('./jasmine/mocks.js');
}

/*
 *	Define and initialise the root view to start the application
 */

window.API_ROOT = 'https://server-core.herokuapp.com/api/';
// window.API_ROOT = 'http://localhost:8000/api/';

var AppView = require('../modules/app/views/view-app');

var appView = new AppView();


window.authoriseUser = function(res){

	/*
	 *	Test user login status
	 */

	if (res['status']['signed_in']){
		if(res['status']['method'] === 'PROMPT' || res['status']['method'] === 'AUTO'){

			$.ajaxSetup({
				headers: { "X_GOOGLE_AUTH_TOKEN": gapi.auth.getToken().access_token }
			});

		 	gapi.client.load('plus', 'v1', function() {
				gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(res) {

					var emails = _.where(res.emails, function(element){ return /@rehabstudio\.com/g.match(element.value); });

					for(var i in res.emails){

						// If one of the emails stored on the users google+ account is a rehabstudio

						if(/@rehabstudio\.com/.test(res.emails[i].value)){

							// initialise the app

							dispatcher.trigger('login-set-status', true, res.result);


						}else{
							console.log('not a rehabstudio email');
						}
					}
				})
			});
		}
	}
}
