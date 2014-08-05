testDataQueue = require('./data/queue');
testDataPlaylists = require('./data/playlists');
mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');

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