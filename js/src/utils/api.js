/**
* 
* Interface for server API
*
* @class API
* @extends Application
*/


function Api(){}

//Queues

Api.prototype.Queues = {
	addTrackToQueue: function(data){
		/**
		* Sends a request to server to add a track to a queue
		*
		* @method addTrackToQueue
		* @param {Object} data Queue ID (queue) and Track ID (track)
		*/

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + 'queues/' + data.queue + '/tracks/',
			data: {track: data.track},
			success: function(data){
				console.log('queues:tracks:add', data);
			},
			error: function(error){
				console.log('queues:tracks:add:error', error);
			}
		});
	}
};

Api.prototype.Meta = {
	addTrack:function(model, callback){
		/**
		* Sends a request to server to store a track information. This must be done before a track can be added to a queue/playlist 
		*
		* @for API
		* @method addTrack
		* @param {Object} model Track information
		* @param {Function} callback function provided to allow a callback to perform further operations such as adding a track to a
		* queue/playlist
		*/

		var xhr = $.ajax({
			type: 'POST',
			url: window.API_ROOT + 'metadata/tracks/',
			data: {source_id : model.source_id, source_type: model.source_type}
		});

		xhr.done(function(data){
			callback(data);
		});
	}
}

//Playlists

Api.prototype.Playlists = {
	addTrackToPlaylist: function(data){
		/**
		* Sends a request to add a track to a playlist
		*
		* @method addTrackToQueue
		* @param {Object} data Queue ID and Track ID
		* @for API
		*/

		$.ajax({
			type: 'POST',
			url: window.API_ROOT + 'playlists/' + data.playlist + '/tracks/',
			dataType: 'JSON',
			data: {track: data.track},
			success: function(data){
				console.log('playlists:tracks:add', data);
			},
			error: function(error){
				console.log('playlists:tracks:add:error', error);
			}
		});
	},

	createPlaylist: function(data){
		/**
		* Sends a request to server create a new playlist
		*
		* @method createPlaylist
		* @param {Object} data The playlist name (name) and description (description) are supplied.
		* @for API
		*/
		
		$.ajax({
			type: 'POST',
			url: window.API_ROOT + 'playlists/',
			dataType: 'JSON',
			data: data,
			success: function(data){
				console.log('playlists:create:', data);
			},
			error: function(error){
				console.log('playlists:create:error', error);
			}
		});
	}

};

Api.prototype.Search = {

	search: function(data){
		$.ajax({
			type: 'POST',
			url: window.API_ROOT + 'search/?query=' + data,
			success: function(data){
				console.log(data);
			},
			error: function(){

			}
		});
	}
}

module.exports = new Api();