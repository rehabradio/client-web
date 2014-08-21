//playlist methods

module.exports = {
	showPlaylists:function(){
		var options = {
			path: 'playlists' 
		};
		
		dispatcher.trigger('router:showModule', 'playlist', options);
	},

	showPlaylist:function( playlistID ){
		console.log('showPlaylist');	

		var options = {
			path : 'playlists/'+playlistID +'/'
		}

		dispatcher.trigger('route:showModule', 'playlist', options);

	},

	showPlaylistTracks:function(playlistID){
		console.log('showPlaylistTracks');
	},

	showPlaylistTrack:function(playlistID, trackID){
		console.log('showPlaylistTrack');
	}
};