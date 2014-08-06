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
 *	Use Mock data by including the debug param in the URL
 */

if(document.location.search.match(/debug/gi)){
	var tests = require('./tests/test.js');
}

/*
 *	Define and initialise the root view to start the application
 */

var AppView = require('./src/modules/app/views/view-app');

var appView = new AppView();