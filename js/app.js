Backbone = require('backbone');
$ = require('jquery');

Backbone.$ = $;

dispatcher = require('./src/utils/dispatcher');
dataStore = require('./src/utils/dataStore');
router = require('./src/utils/router');

tests = require('./tests/test.js');

AppView = require('./src/views/view-app');

var appView = new AppView();