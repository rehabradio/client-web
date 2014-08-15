module.exports = Marionette.ItemView.extend({

	tagName: 'tr',

	template: require('../templates/view-track.hbs'),

	events: {
		'click .delete': '_onDeleteTrack'
	},

	_onDeleteTrack: function(){

		dispatcher.trigger('queue:track:delete', this.model);
	}

});