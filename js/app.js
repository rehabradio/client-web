Backbone = require('backbone');
_ = require('underscore');
$ = require('jquery');

Backbone.$ = $;

dispatcher = require('./src/utils/dispatcher');
dataStore = require('./src/utils/dataStore');
router = require('./src/utils/router');

if(document.location.search.match(/debug/gi)){
	var tests = require('./tests/test.js');
}

var AppView = require('./src/modules/app/views/view-app');

var appView = new AppView();