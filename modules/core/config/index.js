/*
 *	Require global librarys and put them on the global scope
 */

Backbone = require('backbone');
_ = require('underscore');
$ = require('jquery');

Backbone.$ = $;

/*
 *	Put Marionette and Handlebars on the global namespace
 */

Marionette = require('backbone.marionette');
Handlebars = require('hbsfy/runtime');

/*
 *	Utils:
 *		dispatcher: Globel event hooks
 *		dataStore: Store for collections so that data can be shared between modules
 */

dispatcher = require('../utils/dispatcher');
dataStore = require('../utils/dataStore');


//API ROOT

window.API_ROOT = 'http://server-core.herokuapp.com/api/';
