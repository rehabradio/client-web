var testDataQueue = require('./data/queue'); 
var testDataPlaylists = require('./data/playlists'); // Playlist data
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

			case 'POST':

				testDataQueue.count += 1;
				testDataQueue.results.push(data);

				res = {success: true};

				this.responseText = JSON.stringify(res);

				break;

			case 'GET':
				res = testDataQueue;

				this.responseText = JSON.stringify(res);

				break;


			case 'DELETE':
				// Remove by track_id.

				testDataQueue.count -= 1;
				testDataQueue.results = _.without(testDataQueue.results, _.findWhere(testDataQueue.results, {track_id: data}));

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
				debugger;
				break;

			case 'DELETE':
				break;

			default:
				break;
		}

	}
});
