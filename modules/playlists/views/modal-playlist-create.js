module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-playlist-create.hbs'),

	events: {
		'click .cancel': 'remove',
		'click .save': '_onSavePlaylist'
	},

	initialize: function(){

	},

	_onSavePlaylist: function(){
		
		var data = {
			name: this.el.querySelector('input[name="playlist-create-name"]').value,
			description: this.el.querySelector('input[name="playlist-create-description"]').value
		};

		dispatcher.trigger('playlist:create', data);
		this.remove();
	}
});