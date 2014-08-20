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

	_onAddToQueue: function(e){
		e.preventDefault();

		var id = this.model.get('track').id;

		dispatcher.trigger('add-track-to-queue', id); 

	},

	_onAddToPlaylist: function(e){
		e.preventDefault();

		var self = this;

		// Filter playlists to not include current playlist

		var playlists = dataStore.playlistsCollection.filter(function(element){ return element.get('id') !== self.playlist; }),
			$select = self.$el.find('select');

		var placeholder = document.createElement('option');

		placeholder.setAttribute('selected', '');
		placeholder.setAttribute('disabled', '');
		placeholder.innerText = 'Select your playlist';

		$select.empty().append(placeholder);

		_.each(playlists, function(element){
			var option = document.createElement('option');
			option.innerText = element.get('name');
			option.value = element.get('id');

			$select.append(option);
		});


	},

	_onSelectPlaylist: function(e){
		e.preventDefault();
		
		var data = {
			playlist: e.target.value,
			track: this.model.get('id')
		};

		dispatcher.trigger('playlist:track:add', data);	
	},

	_onRemoveFromPlaylist: function(e){
		e.preventDefault();

		dispatcher.trigger('playlist:track:remove', this.model); 
	}
 });