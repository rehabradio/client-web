/*
 *	Require global librarys and put them on the global scope
 */

Backbone = require('backbone');
_ = require('underscore');
$ = require('jquery');

/*
 *	Tell Backbone to use jQuery
 */

Backbone.$ = $;

/*
 *	Utils:
 *		dispatcher: Globel event hooks
 *		dataStore: Store for collections so that data can be shared between modules
 *		router: Bend the URL to your will with the power of Backbone Routing
 */

dispatcher = require('./src/utils/dispatcher');
dataStore = require('./src/utils/dataStore');
router = require('./src/utils/router');

/*
 *	Use Mock data by including the 'debug' param in the URL
 */

if(document.location.search.match(/debug/gi)){
	var tests = require('./jasmine/mocks.js');
}

/*
 *	Define and initialise the root view to start the application
 */

var AppView = require('../modules/app/views/view-app');

var appView = new AppView();

window.authoriseUser = function(res){

	/*
	 *	Test user login status
	 */

	if (res['status']['signed_in']) {

	 	gapi.client.load('plus', 'v1', function() {
			gapi.client.plus.people.get( {'userId' : 'me'} ).execute(function(res) {

				var emails = _.where(res.emails, function(element){ return /@rehabstudio\.com/g.match(element.value); });

				for(var i in res.emails){
					if(/@rehabstudio\.com/.test(res.emails[i].value)){
						dispatcher.trigger('login-set-status', true, res.result);
					}else{
						console.log('not a rehabstudio email');
					}
				}
			})
		});
	}else{

		dispatcher.trigger('login-set-status', false);
	}
}