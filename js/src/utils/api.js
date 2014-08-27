

function Api(){}

Api.prototype = {

	addTrackToPlaylist: function(data){

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

	addTrackToQueue: function(data){
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
}

module.exports = new Api();