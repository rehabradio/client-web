//playlist methods

module.exports = {
	showPlaylists:function(){
		console.log('showPlaylists');	
		dispatcher.trigger('router:showPlaylists');
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