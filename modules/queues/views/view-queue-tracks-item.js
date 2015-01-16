module.exports = Marionette.ItemView.extend({

	tagName: 'tr',

	className: 'track',

	template: require('../templates/view-track.hbs'),

	events: {
		'click .remove-from-queue': '_onRemoveTrack'
	},

	_onRemoveTrack: function(){

		this.trigger('queues:tracks:remove', this.model);
	}

});