var ViewCollectionItem = require('../../core/views/view-collection-item-base')

module.exports = ViewCollectionItem.extend({
  
	className: 'track',

	template: require('../templates/view-track.hbs'),

	events: {
		'click .remove-from-queue': '_onRemoveTrack'
	},

	className: 'track',

	animationNameAdd: 'track-animation-add',

	animationNameRemove: 'track-animation-remove',
  
});