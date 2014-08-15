var dataQueues = require('./data/queues'); 
var dataQueueTracks = require('./data/queue-tracks'); 
var dataPlaylists = require('./data/playlists'); // Playlist data
var dataMeta = require('./data/meta'); // Playlist data
var dataTracks = require('./data/tracks'); // Playlist tracks data
var dataSearchResults = require('./data/search-results'); // Playlist tracks data
var dataSpotifyTracks = require('./data/spotify-tracks'); // Spotify tracks data
var dataSoundcloudTracks = require('./data/soundcloud-tracks'); // Soundcloud tracks data

var mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');


$.mockjax({
	url: 'http://localhost:8000/api/metadata/tracks',
	responseTime: 100,
	response: function(req){

		var type = req.type,
			data = req.data,
			res;

		switch(type){


			case 'POST':

				var sourceTracks, sourceTrack, track = {};

				if(!!_.find(dataMeta.results, function(element){ return element.track_id === data.source_id && element.source_type == data.source_type})){

					
					/*
					 *	Track does exist in db
					 */

					// if(data.source_type === 'spotify'){

						track = _.find(dataMeta.results, function(element){ return element.track_id === data.source_id; });
						this.responseText = track.id.toString();
					
					// }else if(data.source_type === 'soundcloud'){

					// }


				}else{
					
					/*
					 *	Track doesn't exist in db
					 */

					if(data.source_type === 'spotify'){
						sourceTracks = dataSpotifyTracks;

					}else if(data.source_type === 'soundcloud'){
						sourceTracks = dataSoundcloudTracks;
					}

					sourceTrack = _.find(sourceTracks, function(element){ return element.source_id === data.source_id; });

					
					track.id = dataMeta.count + 1;
					track.album_name = sourceTrack.album.name;
					track.artists = sourceTrack.artists
					track.image_large = sourceTrack.image_large;
					track.image_medium = sourceTrack.image_medium;
					track.image_small = sourceTrack.image_small;
					track.source_type = sourceTrack.source_type;
					track.track_id = sourceTrack.source_id;
					track.track_name = sourceTrack.name;
					track.votes = 0;

					dataMeta.count += 1;

					dataMeta.results.push(track);

					this.responseText = track.id.toString();
				}

				break;

		}
	}
});

$.mockjax({
	url: /http:\/\/localhost:8000\/api\/metadata\/search\/(.*)\/\?q=(.*)/,
	urlParams: ['source', 'search'],
	responseTime: 100,
	response: function(req){

		var type = req.type,
			data = req.data,
			res;

		switch(type){


			case 'GET':

				res = dataSearchResults[req.urlParams.source];

				this.responseText = JSON.stringify(res);

				break;

			default:
				break;
		}
	}
});

$.mockjax({
	url: 'http://localhost:8000/api/queues',
	responseTime: 100,
	response: function(req){

		var type = req.type,
			data = req.data,
			res;

		switch(type){


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
	url: /http:\/\/localhost:8000\/api\/queues\/(.*)\/tracks\/(.*)/,
	urlParams: ['queueId', 'trackId'],
	responseTime: 100,
	response: function(req){

		var type = req.type,
			id = parseInt(req.urlParams.id),
			res;

		var queue;

		switch(type){

			case 'DELETE':
				// Remove by id.

				queue = _.findWhere(dataQueueTracks, {id: parseInt(req.urlParams.queueId)});

				queue.count -= 1;
				queue.results = _.without(queue.results, _.findWhere(queue.results, {queue_id: parseInt(req.urlParams.trackId)}));

				res = {success: true};

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

		var type = req.type,
			id = parseInt(req.urlParams.id),
			res;

		switch(type){

			case 'POST':

				var track = _.clone(_.find(dataMeta.results, function(element){ return element.id === parseInt(req.data); }));
				track.queue_id = parseInt(Math.random() * 100);//_.max(_.pluck(dataQueueTracks[id - 1].results, 'queue_id')) + 1;

				dataQueueTracks[id - 1].count += 1;

				dataQueueTracks[id - 1].results.push(track);

				res = {success: true};

				this.responseText = JSON.stringify(res);

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

		var type = req.type,
			id = parseInt(req.urlParams.id),
			res;

		switch(type){

			case 'POST':
	
				dataQueues.count += 1;

				var data = _.findWhere(dataMeta.results, {id: id});
				dataQueues.results.push(data);

				res = {success: true};

				this.responseText = JSON.stringify(res);

				break;

			case 'GET':

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

		var type = req.type,
			data = req.data,
			playlistId = parseInt(req.urlParams.playlist),
			trackId = parseInt(req.urlParams.track),
			res;

		switch(type){

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

		var type = req.type,
			data = req.data,
			id = parseInt(req.urlParams.id),
			res;

		switch(type){

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
