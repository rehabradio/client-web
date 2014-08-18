module.exports = Marionette.ItemView.extend({

	// tagName: 'li',

	template: require('../templates/view-playlist.hbs'),

	events: {
		'click .view-playlist': '_onShowPlaylist'
	},

	initialize: function(options){
		// this.parent = options.parent;
		// this.setElement(this.template(this.model.toJSON()));
	},

	_onShowPlaylist: function(e){
		e.preventDefault();

		// this.parent.model.set('playlist', this.model.get('id'));

		dispatcher.trigger('playlist:tracks:show');
		dispatcher.trigger('playlist:show', this.model.get('id'));
	}
});