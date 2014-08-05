var testDataQueue = require('./data/queue');
var testDataPlaylists = require('./data/playlists');
var testDataTracks = require('./data/tracks');

var mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');

$.mockjax({
	url: 'http://localhost:8000/api/queue',
	responseTime: 750,
	responseText: testDataQueue
});

$.mockjax({
	url: 'http://localhost:8000/api/playlists',
	responseTime: 750,
	responseText: testDataPlaylists
});

$.mockjax({
	url: /http:\/\/localhost:8000\/api\/playlists\/([\d]+)/,
	urlParams: ['playlistId'],
	responseTime: 750,
	response: function(settings){

		var playlistId = parseInt(settings.urlParams.playlistId),
			data = _.findWhere(testDataTracks, {id: playlistId });

		this.responseText =  JSON.stringify(data);
	}
});

// "http://rehabradio.localhost/api/metadata/tracks/add/playlist/?source_type=spotify&source_id=5hfP8cKSzpfBisP3R24cAy&playlist_id=2". 

$.mockjax({
	url: /http:\/\/localhost:8000\/api\/metadata\/tracks\/add\/playlist\/([\d]+)/,
	urlParams: ['playlistId'],
	responseTime: 750,
	response: function(settings){

		var playlistId = parseInt(settings.urlParams.playlistId),
			data = _.findWhere(testDataTracks, {id: playlistId });

		this.responseText =  JSON.stringify(data);
	}
});