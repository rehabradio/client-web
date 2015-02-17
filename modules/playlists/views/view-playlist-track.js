/*
 *	View for individual tracks within playlist
 */

var ViewCollectionItem = require('../../core/views/view-collection-item-base')

module.exports = ViewCollectionItem.extend({
  
	tagName: 'div',

	events: {
		'click button': '_onRemove'
	},

	className: 'track',

	template: require('../templates/view-playlist-track.hbs'),

	animationNameAdd: 'track-animation-add',

	animationNameRemove: 'track-animation-remove',
  
});