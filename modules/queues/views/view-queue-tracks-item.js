module.exports = Marionette.ItemView.extend({

	tagName: 'div',

	className: 'track',

	template: require('../templates/view-track.hbs'),

	events: {
		'click .remove-from-queue': '_onRemoveTrack'
	},

	initialize: function(){

		this.listenTo(this, 'animation:remove', this._animationRemove, this);

		this.el.addEventListener(animationEndEvent, this._animationRemoveComplete.bind(this), false);
	},

	_onRemoveTrack: function(){
		this.trigger('queues:tracks:remove', this.model);

	},

	_animationRemove: function(){
		this.el.classList.add('animation-remove');
	},

	_animationRemoveComplete: function(){
		this.trigger('animation:remove:complete');
	}

});