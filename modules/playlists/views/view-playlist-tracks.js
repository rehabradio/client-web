/*
 *	Parent view for displaying all tracks within a playlist
 */

var TrackView = require('./view-playlist-track');

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/view-playlists-tracks.hbs'),

	childView: TrackView,

	childViewContainer: 'tbody'
});