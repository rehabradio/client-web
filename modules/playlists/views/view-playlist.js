module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-playlist.hbs'),

	events: {
		'click .view-playlist': '_onShowPlaylist',
		'click #playlist-create': '_onPlaylistCreate'
	},

	_onShowPlaylist: function(e){
		e.preventDefault();

		dispatcher.trigger('playlist:tracks:show');
		dispatcher.trigger('playlist:show', this.model.get('id'));
	},

	_onPlaylistCreate: function(){
		
	}
});