module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-playlists-controls.hbs'),

	triggers: {
		'click .playlist-create': 'playlists:create'
	},

	// events: {
	// 	'click .playlist-create': 'onPlaylistsCreate'		
	// },


	// onPlaylistsCreate: function(){
	// 	console.log('button clicked');
	// },

	intialize: function(){

	}
});