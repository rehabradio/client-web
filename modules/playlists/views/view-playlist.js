module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-playlist.hbs'),

	className: 'playlist',

	events: {
		'click .playlist-view': '_onShowPlaylist',
		'click .playlist-delete': '_onDeletePlaylist'
	},

	initialize: function(){
		var self = this;

		/*
		 *	Load the thumbnail images for the first four tracks in the playlist
		 */

		self.listenTo(self.model, 'change:coverart', self._onCoverartChange);

		if(self.model.get('coverart').length < 4){
			$.ajax({
				url: window.API_ROOT + 'playlists/' + self.model.get('id') + '/tracks/',
				type: 'GET',
				success: function(data){

					var count = Math.min(data.count, 4),
						coverart = [];

					for(var i = 0; i < count; i++){

						if(!!data.results[i]){

							/*
							 *	If the track doesn't have a thumbnail then it is skipped
							 */

							if(!!data.results[i].track.image_small){

								coverart.push({url: data.results[i].track.image_small});
							}else{

								count++;
							}
						}
					}

					self.model.set('coverart', coverart);
				}
			});
		}
	},


	_onShowPlaylist: function(){

		/*
		 *	Bubbles up to layout view and is available in the controller through the layout.
		 */

		this.trigger('playlists:tracks:show', this.model.get('id'));
		
	},

	_onDeletePlaylist: function(){

		this.trigger('playlists:delete', this.model);

	},

	_onCoverartChange: function(){
		
		var self = this;

		_.each(this.model.get('coverart'), function(element){
			self.$el.find('#playlist-view .cover-art').append('<img src="' + element.url + '" alt="">');
		});
		
	}

});