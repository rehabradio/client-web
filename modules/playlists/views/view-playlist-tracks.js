/*
 *	Parent view for displaying all tracks within a playlist
 */

var ViewCollectionBase = require('../../core/views/view-collection-view-base'),
	ViewTrack = require('./view-playlist-track'),
	ViewEmpty = require('./view-playlists-tracks-empty');

module.exports = ViewCollectionBase.extend({

	template: require('../templates/view-playlists-tracks.hbs'),

	emptyTemplate: _.template('<span>No tracks</span>'),

	ChildView: ViewTrack,

	parentElement: '.tracks',
});