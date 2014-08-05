// Backbone = require('backbone');
// $ = require('jquery');

// Backbone.$ = $;

dispatcher = require('../../../utils/dispatcher');
datastore = require('../../../utils/datastore');

PlaylistView = require('./view-playlist');

module.exports = Backbone.View.extend({

	el: '#playlists',

	collection: datastore.playlistsCollection,
	
	initialize: function(){

		dispatcher.on('tracks-show', this._showTracks, this);

		this.listenTo(this.collection, 'add', this._onAddPlaylist, this);
	},

	_onAddPlaylist: function(model){

		console.log('playlist', model.toJSON() );

		var $parent = this.$el.find('ul');
		var view = new PlaylistView({model: model});

		$parent.append(view.render().$el);
	},

	_showTracks: function(){
		this.$el.addClass('contract');
	},

	_hideTracks: function(){
		this.$el.removeClass('contract');
	}
});