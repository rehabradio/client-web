module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-playlist-add-track.hbs'),

	events: {
		'click .cancel': 'remove',
		'click .save': '_onSavePlaylist'
	},
	
    initialize: function(options){

    	this.request = options.request;

		/*
		 *	Filter the collection to exclude the currently displayed playlist
		 */

		var owner = dataStore.appModel.get('displayName');

		this.playlists = _.filter(this.collection.toJSON(), function(e){ return e.owner === owner });

	},

	render: function(){

		this.setElement(this.template({playlists: this.playlists}));

		return this;
	},

	_onSavePlaylist: function(){

		var formData = this.$el.find('form').serializeArray();

		for(var i in formData){

			(function(playlist){
				this.request.done(function(response){

					this.trigger('playlist:tracks:add', {playlist: playlist, track: response.id});
					
				}.bind(this));
			}.bind(this))(formData[i].name);
		}

		this.remove();
	}
});