//playlist methods

module.exports = {
	showPlaylists:function(options){
		
		dispatcher.trigger('router:showModule', 'playlists');
	},

	showPlaylist:function(options){
		console.log('showPlaylist');	
	},

	showPlaylistTracks:function(){
		console.log('showPlaylistTracks');
	},

	showPlaylistTrack:function(){
		console.log('showPlaylistTrack');
	}
};