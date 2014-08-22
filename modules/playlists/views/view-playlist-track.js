/*
 *	View for individual tracks within playlist
 */
// var TrackModel = require('../models/models-track.js');


 module.exports = Marionette.ItemView.extend({

 	tagName: 'tr',

 	className: 'track',

	template: require('../templates/view-playlist-track.hbs'),

	events: {
		'click .add-to-queue': '_onAddToQueue',
		'click .add-to-playlist': '_onAddToPlaylist',
		'click .remove-from-playlist': '_onRemoveFromPlaylist',
		'change select': '_onSelectPlaylist'
	},

	initialize: function(){

	},

	_onAddToQueue: function(e){

		var id = this.model.get('track').id;

		dispatcher.trigger('playlist:queue:modal', id);
	},

	_onAddToPlaylist: function(){

		/*
		 *	Harvest the Playlist id from the model url
		 */

		var urlRegex = /api\/playlists\/(.*)\/tracks\/(.*)\//,
			url = this.model.url();

		var data = {

			playlist: url.match(urlRegex)[1],
			track: this.model.get('track').id
		}

		/*
		 *	Trigger the initialisation of the Add-To-Playlists modal
		 */

		dispatcher.trigger('playlist:tracks:modal', data);
	},

	_onRemoveFromPlaylist: function(e){
		e.preventDefault();

		dispatcher.trigger('playlist:track:remove', this.model); 
	}
 });