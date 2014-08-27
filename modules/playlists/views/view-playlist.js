module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-playlist.hbs'),

	className: 'playlist',

	events: {
		'click .playlist-view': '_onShowPlaylist',
		'click .playlist-delete': '_onDeletePlaylist'
	},

	initialize: function(){
		var self = this;

		self.listenTo(self.model, 'change:coverart', self._onCoverartChange);

		$.ajax({
			url: window.API_ROOT + 'playlists/' + self.model.get('id') + '/tracks/',
			type: 'GET',
			success: function(data){

				var count = Math.min(data.count, 4),
					coverart = [];

				for(var i = 0; i < count; i++){

					if(!!data.results[i]){

						if(!!data.results[i].track.image_small){

							coverart.push(data.results[i].track.image_small);
						}else{

							count++;
						}
					}
				}

				self.model.set('coverart', coverart);
			}
		});
	},


	_onShowPlaylist: function(){

		/*
		 *	Bubbles up to layout view and is available in the controller through the layout.
		 */

		this.trigger('playlists:tracks:show', this.model.get('id'));

		// dispatcher.trigger('playlist:tracks:show');
		// dispatcher.trigger('playlist:show', this.model.get('id'));
	},

	_onDeletePlaylist: function(){

		dispatcher.trigger('playlist:delete', this.model);

	},

	_onCoverartChange: function(){
		
		var self = this;

		_.each(this.model.get('coverart'), function(element){
			self.$el.find('.coverart').append('<img src="' + element + '" alt="">');
		});
		
	}

});