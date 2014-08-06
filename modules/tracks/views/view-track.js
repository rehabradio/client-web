/*
 *	View for individual tracks within playlist
 */

 module.exports = Backbone.View.extend({

	tagName: 'li',

	events: {
		'click .add-to-queue': '_onAddToQueue',
		'click .add-to-playlist': '_onAddToPlaylist',
		'change select': '_onSelectPlaylist'
	},

	template: require('../templates/view-playlist-track.hbs'),
	
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'remove', this._destroy);

		this.$el.data('source', this.model.get('source'));
	},

	render: function(){
		this.$el.empty().html(this.template(this.model.toJSON()));
		return this;
	},

	_onChange: function(){
		console.log('change');
	},

	_destroy: function(){
		this.off();
		this.remove();
	},

	_onAddToQueue: function(e){
		e.preventDefault();

		var data = {
			url: e.target.href
		}

		dispatcher.trigger('add-track-to-queue', this); 

	},

	_onAddToPlaylist: function(e){
		e.preventDefault();


		var playlists = dataStore.playlistsCollection,
			$select = this.$el.find('select');

		var placeholder = document.createElement('option');

		placeholder.setAttribute('selected', '');
		placeholder.setAttribute('disabled', '');
		placeholder.innerText = 'Select your playlist';

		$select.append(placeholder);

		playlists.each(function(element, index){
			var option = document.createElement('option');
			option.innerText = playlists.at(index).get('name');
			option.value = playlists.at(index).get('id');

			$select.append(option);
		});


	},

	_onSelectPlaylist: function(e){

		var data = {
			playlistId: e.target.value,
			sourceType: this.model.get('source_type'),
			sourceId: this.model.get('source_id')
		}

		dispatcher.trigger('add-track-to-playlist', data);	
	}
});