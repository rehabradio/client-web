module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-playlist.hbs'),

	events: {
		'click .playlist-view': '_onShowPlaylist',
		'click .playlist-delete': '_onDeletePlaylist'
	},

	_onShowPlaylist: function(){

		dispatcher.trigger('playlist:tracks:show');
		dispatcher.trigger('playlist:show', this.model.get('id'));
	},

	_onDeletePlaylist: function(){

		dispatcher.trigger('playlist:delete', this.model);
	}
});