function Api(){}

//Queues

Api.prototype.Queues = {
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
};

Api.prototype.Meta = {
	addTrack:function(model, callback){
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

module.exports = new Api();