module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-playlist.hbs'),

	events: {
		'click .view-playlist': '_onShowPlaylist'
	},

	_onShowPlaylist: function(e){
		e.preventDefault();

		dispatcher.trigger('playlist:tracks:show');
		dispatcher.trigger('playlist:show', this.model.get('id'));
	}
});