/*
 *	View for individual tracks within playlist
 */
// var TrackModel = require('../models/models-track.js');


 module.exports = Marionette.ItemView.extend({

 	className: 'track',

	template: require('../templates/view-playlist-track.hbs'),

	events: {
		'click .add-to-queue': '_onAddToQueue',
		'click .add-to-playlist': '_onAddToPlaylist',
		'click .remove-from-playlist': '_onRemoveTrack',
		'change select': '_onSelectPlaylist'
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render, this);
	},

	_onAddToQueue: function(){

		var id = this.model.get('track').id;

		this.trigger('queue:tracks:modal', id);
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
		};

		/*
		 *	Trigger the initialisation of the Add-To-Playlists modal
		 */

		this.trigger('playlists:tracks:modal', data);
	},

	_onRemoveTrack: function(){

		this.el.addEventListener(animationEndEvent, this._removeTrack.bind(this))
		this.el.classList.add('track-animation-remove');

	},

	_removeTrack: function(e){

		this.trigger('playlists:tracks:remove', this.model);
	}
 });