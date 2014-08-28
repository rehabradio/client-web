module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-playlist-delete.hbs'),

	events: {
		'click .cancel': 'remove',
		'click .save': '_onSavePlaylist'
	},

	_onSavePlaylist: function(){
		
		this.trigger('playlist:delete:confirm', this.model);
		this.remove();
	}
});