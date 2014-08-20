//playlist methods

module.exports = {
	showPlaylists:function(){
		console.log('showPlaylists');	
		dispatcher.trigger('router:showView', 'playlist');
		//router.navigate('playlists');
	},

	showPlaylist:function(){
		console.log('showPlaylist');	
	},

	showPlaylistTracks:function(){
		console.log(arguments);
		console.log('showPlaylistTracks');
	},

	showPlaylistTrack:function(){
		console.log('showPlaylistTrack');
	}
};