var testDataQueue = require('./data/queue');
var testDataPlaylists = require('./data/playlists');
var mockjax = require('jquery-mockjax/jquery.mockjax');

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