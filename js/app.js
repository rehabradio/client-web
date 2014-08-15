/*
 *	Require global librarys and put them on the global scope
 */

Backbone = require('backbone');
_ = require('underscore');
$ = require('jquery');

Backbone.$ = $;
Backbone.emulateHTTP = true;

Marionette = require('backbone.marionette');

/*
 *	Tell Backbone to use jQuery
 */


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

window.API_ROOT = 'http://server-core.herokuapp.com/api/';

var AppView = require('../modules/app/views/view-app');

var appView = new AppView();