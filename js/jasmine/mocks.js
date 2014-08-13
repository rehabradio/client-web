var dataQueues = require('./data/queues'); 
var dataQueueTracks = require('./data/queue-tracks'); 
var dataPlaylists = require('./data/playlists'); // Playlist data
var dataMeta = require('./data/meta'); // Playlist data
var dataTracks = require('./data/tracks'); // Playlist tracks data

var mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');

$.mockjax({
	url: 'http://localhost:8000/api/queues',
	responseTime: 100,
	response: function(req){

		var method = req.type,
			data = req.data,
			res;

		switch(method){


			case 'GET':
				res = dataQueues;

				this.responseText = JSON.stringify(res);

				break;

			default:
				break;
		}

	}
});

$.mockjax({
	url: /http:\/\/localhost:8000\/api\/queues\/([a-zA-Z0-9]+)\/tracks/,
	urlParams: ['id'],
	responseTime: 100,
	response: function(req){

		var method = req.type,
			id = parseInt(req.urlParams.id),
			res;

		switch(method){

			case 'POST':

				break;

			case 'GET':

				res = dataQueueTracks[id - 1];

				this.responseText = JSON.stringify(res);

				break;

			case 'DELETE':
				// Remove by id.

				break;

			default:
				break;
		}

	}
});

$.mockjax({
	url: /http:\/\/localhost:8000\/api\/queues\/([a-zA-Z0-9]+)/,
	urlParams: ['id'],
	responseTime: 100,
	response: function(req){

		var method = req.type,
			id = parseInt(req.urlParams.id),
			res;

		switch(method){

			case 'POST':
	
				dataQueues.count += 1;

				var data = _.findWhere(dataMeta.results, {id: id});
				dataQueues.results.push(data);

				res = {success: true};

				this.responseText = JSON.stringify(res);

				break;

			case 'GET':

				break;


			case 'DELETE':
				// Remove by id.

				dataQueues.count -= 1;
				dataQueues.results = _.without(dataQueues.results, _.findWhere(dataQueues.results, {id: id}));

				res = {success: true};

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

				var playlist = _.findWhere(dataTracks.results, {id: playlistId});
				var track = _.findWhere(dataMeta.results, {id: trackId});

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
	url: 'http://localhost:8000/api/playlists',
	responseTime: 100,
	responseText: dataPlaylists
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

				res = _.findWhere(dataTracks.results, {id: id });

				this.responseText =  JSON.stringify(res);

				break;

			case 'PUT':

				dataTracks.results.push(data);

				break;

			case 'DELETE':
				break;

			default:
				break;
		}

	}
});
