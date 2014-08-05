Backbone = require('backbone');
$ = require('jquery');

Backbone.$ = $;

dispatcher = require('./src/utils/dispatcher');
dataStore = require('./src/utils/dataStore');
router = require('./src/utils/router');

testDataQueue = require('./tests/data/queue');
testDataPlaylists = require('./tests/data/playlists');
mockjax = require('../node_modules/jquery-mockjax/jquery.mockjax');

$.mockjax({
	url: 'http://rehabradio.vagrant.local:8000/api/queue',
	responseTime: 750,
	responseText: testDataQueue
});

$.mockjax({
	url: 'http://rehabradio.vagrant.local:8000/api/playlists',
	responseTime: 750,
	responseText: testDataPlaylists
});

AppView = require('./src/views/view-app');

var appView = new AppView();

// var tracks = new tracks();