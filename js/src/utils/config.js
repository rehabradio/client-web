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
require('../../libs/backbone.marionette.subrouter.js');

/*
 *	Utils:
 *		dispatcher: Globel event hooks
 *		dataStore: Store for collections so that data can be shared between modules
 *		router: Bend the URL to your will with the power of Backbone Routing
 */

dispatcher = require('./dispatcher');
dataStore = require('./dataStore');

/*
 *	Use Mock data by including the 'debug' param in the URL
 */

if(document.location.search.match(/debug/gi)){
	//var tests = require('./jasmine/mocks.js');
}

/*
 *	Define and initialise the root view to start the application
 */

window.API_ROOT = 'https://server-core.herokuapp.com/api/';