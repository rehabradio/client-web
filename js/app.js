Backbone = require('backbone');
_ = require('underscore');
$ = require('jquery');

Backbone.$ = $;

dispatcher = require('./src/utils/dispatcher');
dataStore = require('./src/utils/dataStore');
router = require('./src/utils/router');

var tests = require('./tests/test.js');

var AppView = require('./src/views/view-app');

var appView = new AppView();