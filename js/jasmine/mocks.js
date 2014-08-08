var testDataQueue = require('./data/queue'); 
var testDataPlaylists = require('./data/playlists'); // Playlist data
var testDataMeta = require('./data/meta'); // Playlist data
var testDataTracks = require('./data/tracks'); // Playlist tracks data

var mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');

$.mockjax({
	url: 'http://localhost:8000/api/queue',
	responseTime: 100,
	response: function(req){

		var method = req.type,
			data = req.data,
			res;

		switch(method){


			case 'GET':
				res = testDataQueue;

				this.responseText = JSON.stringify(res);

				break;

			default:
				break;
		}

	}
});


$.mockjax({
	url: /http:\/\/localhost:8000\/api\/playlists\/([a-zA-Z0-9]+)\/tracks\/([a-zA-Z0-9]+)/,
	urlParams: ['playlist', 'track'],
	responseTime: 100,
	response: function(req){

		var method = req.type,
			data = req.data,
			playlistId = parseInt(req.urlParams.playlist),
			trackId = parseInt(req.urlParams.track),
			res;

		switch(method){

			case 'POST':

				var playlist = _.findWhere(testDataTracks.results, {id: playlistId});
				var track = _.findWhere(testDataMeta.results, {id: trackId});

				playlist.results.push(track);

				res = {success: true};

				this.responseText = JSON.stringify(res);

				break;

			default:
				break;
		}

	}
});


$.mockjax({
	url: /http:\/\/localhost:8000\/api\/queue\/([a-zA-Z0-9]+)/,
	urlParams: ['id'],
	responseTime: 100,
	response: function(req){

		var method = req.type,
			id = parseInt(req.urlParams.id),
			res;

		switch(method){

			case 'POST':
	
				testDataQueue.count += 1;

				var data = _.findWhere(testDataMeta.results, {id: id});
				testDataQueue.results.push(data);

				res = {success: true};

				this.responseText = JSON.stringify(res);

				break;

			case 'GET':

				break;


			case 'DELETE':
				// Remove by id.

				testDataQueue.count -= 1;
				testDataQueue.results = _.without(testDataQueue.results, _.findWhere(testDataQueue.results, {id: id}));

				res = {success: true};

				this.responseText = JSON.stringify(res);

				break;

			default:
				break;
		}

	}
});

$.mockjax({
	url: 'http://localhost:8000/api/playlists',
	responseTime: 100,
	responseText: testDataPlaylists
});

$.mockjax({
	url: /http:\/\/localhost:8000\/api\/playlists\/([\d]+)/,
	urlParams: ['id'],
	responseTime: 100,
	response: function(req){

		var method = req.type,
			data = req.data,
			id = parseInt(req.urlParams.id),
			res;

		switch(method){

			case 'POST':
				break;

			case 'GET':

				res = _.findWhere(testDataTracks.results, {id: id });

				this.responseText =  JSON.stringify(res);

				break;

			case 'PUT':

				testDataTracks.results.push(data);

				break;

			case 'DELETE':
				break;

			default:
				break;
		}

	}
});
