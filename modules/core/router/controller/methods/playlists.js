//playlist methods

module.exports = {
	showPlaylists:function(){
		var options = {
			path: 'playlists' 
		};
		
		dispatcher.trigger('router:showModule', 'playlist', options);
	},

	showPlaylist:function(){
		console.log('showPlaylist');	
	},

	showPlaylistTracks:function(){
		console.log('showPlaylistTracks');
	},

	showPlaylistTrack:function(){
		console.log('showPlaylistTrack');
	}
};