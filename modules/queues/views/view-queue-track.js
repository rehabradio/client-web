module.exports = Marionette.ItemView.extend({

	className: 'track',

	template: require('../templates/view-track.hbs'),

	events: {
		'click .remove-from-queue': '_onRemoveTrack'
	},

	_onRemoveTrack: function(){

		this.el.addEventListener(animationEndEvent, this._removeTrack.bind(this))
		this.el.classList.add('track-animation-remove');

	},

	_removeTrack: function(e){

		this.trigger('queues:tracks:remove', this.model);
	}

});