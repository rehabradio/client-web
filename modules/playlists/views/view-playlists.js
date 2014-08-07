var PlaylistView = require('./view-playlist');

module.exports = Backbone.View.extend({

	el: '#playlists',

	collection: dataStore.playlistsCollection,
	
	initialize: function(){

		dispatcher.on('tracks-show', this._showTracks, this);

		this.listenTo(this.collection, 'add', this._onAddPlaylist, this);

		this.$list = this.$el.find('ul');

		this.render();
	},

	render: function(){
		var self = this;

		self.collection.each(function(model){
			var playlistView = new PlaylistView({model: model});


			self.$list.append(playlistView.render().$el);
		});

	},

	_onAddPlaylist: function(model){

		console.log('playlist', model.toJSON() );

		var view = new PlaylistView({model: model});

		this.$list.append(view.render().$el);
	},

	_showTracks: function(){
		this.$el.addClass('contract');
	},

	_hideTracks: function(){
		this.$el.removeClass('contract');
	}
});