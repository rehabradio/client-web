/*
 *	Parent view for displaying all tracks within a playlist
 */
 
var TrackView = require('./view-playlist-track');

var EmptyView = require('./view-playlists-tracks-empty');

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/view-playlists-tracks.hbs'),

	childView: TrackView,

	childViewContainer: 'tbody',

	emptyView: EmptyView
});