module.exports = Backbone.View.extend({

	template: require('../templates/modal-playlist-add-track.hbs'),

	events: {
		'click .cancel': 'remove',
		'click .save': '_onSavePlaylist'
	},

	initialize: function(){

		/*
		 *	Filter the collection to exclude the currently displayed playlist
		 */

		var self = this;

		this.playlists = _.filter(this.collection.toJSON(), function(element){ return element.id !== parseInt(self.model.get('playlist')); });

	},

	render: function(){

		this.setElement(this.template({playlists: this.playlists}));

		return this;
	},

	_onSavePlaylist: function(){

		var formData = this.$el.find('form').serializeArray(),
			data = {};

		for(var i in formData){
			data = {
				playlist: formData[i].name,
				track: this.model.get('track')
			}

			dispatcher.trigger('playlist:track:add', data);	
		}

		this.remove();
	}
});