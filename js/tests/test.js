var testDataQueue = require('./data/queue');
var testDataPlaylists = require('./data/playlists');
var testDataTracks = require('./data/tracks');

var mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');

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

$.mockjax({
	url: /(http:\/\/rehabradio.vagrant.local:8000\/api\/playlists\/)([\d]+)/,
	urlParams: ['root', 'playlistId'],
	responseTime: 750,
	response: function(settings){

		var playlistId = parseInt(settings.urlParams.playlistId),
			data = _.findWhere(testDataTracks, {id: playlistId });

		this.responseText =  JSON.stringify(data);
	}
});