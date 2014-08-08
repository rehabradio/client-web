var PlaylistsModel = require('../models/models-playlists');
var PlaylistView = require('./view-playlist');
var TracksView = require('../views/view-tracks');

module.exports = Backbone.View.extend({

	el: '#playlists',

	collection: dataStore.playlistsCollection,

	model: new PlaylistsModel(),

	initialize: function(){

		this.tracksView = new TracksView({
			model: this.model
		});

		dispatcher.on('tracks-show', this._showTracks, this);

		this.listenTo(this.collection, 'add', this._onAddPlaylist, this);

		this.$list = this.$el.find('ul');

		this.render();
	},

	render: function(){
		var self = this;

		self.collection.each(function(model){
			var playlistView = new PlaylistView({
				model: model,
				parent: self
			});


			self.$list.append(playlistView.render().$el);
		});

	},

	_onAddPlaylist: function(model){

		console.log('playlist', model.toJSON() );

		var view = new PlaylistView({
			model: model,
			parent: this
		});

		this.$list.append(view.render().$el);
	},

	_showTracks: function(){
		this.$el.addClass('contract');
	},

	_hideTracks: function(){
		this.$el.removeClass('contract');
	}
});