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
 *	Initialize custom components
 */

var range = require('../components/range/range');

/*
 *	Use Mock data by including the 'debug' param in the URL
 */

if(document.location.search.match(/debug/gi)){
	//var tests = require('./jasmine/mocks.js');
}

/*
 *	Define global config variables
 */

window.API_ROOT = 'https://server-core.herokuapp.com/api/';
window.services = ['spotify', 'soundcloud'];

Handlebars.registerHelper('icon', function(data) {
	return new Handlebars.SafeString('<svg viewBox="0 0 100 100" class="icon ' + data + '"><use xlink:href="#' + data + '"></use></svg>')
});

Handlebars.registerHelper('trackduration', function(duration_ms) {

	var milli2seconds = parseInt(Number(duration_ms) / 1000),
		minutes = parseInt(milli2seconds / 60),
		seconds = Math.floor(milli2seconds % 60);

	return minutes + ':' + ((seconds.toString().length === 1) ? '0' + seconds :  seconds);
});

