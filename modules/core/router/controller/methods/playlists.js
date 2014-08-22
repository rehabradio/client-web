//playlist methods

module.exports = {
	showPlaylists:function(){
		var options = {
			path: 'playlists' 
		};
		
		dispatcher.trigger('router:showModule', 'playlist', options);

		//this.layout.main.show('');

	},

	showPlaylist:function( playlistID ){
		console.log('showPlaylist', playlistID);	

		var options = {
			path : 'playlists/'+playlistID +'/'
		}

		console.log(options.path);

		//dispatcher.trigger('route:showModule', 'playlist', options);

	},

	showPlaylistTracks:function(playlistID){
		console.log('showPlaylistTracks');
	},

	showPlaylistTrack:function(playlistID, trackID){
		console.log('showPlaylistTrack');
	}
};