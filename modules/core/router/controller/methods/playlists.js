//playlist methods

module.exports = {
	showPlaylists:function(){
		dispatcher.trigger('router:showModule', 'playlists');
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