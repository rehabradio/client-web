var ViewPlaylistCheckbox = require('./view-playlist-checkbox'),
	ViewEmpty = require('./view-playlist-empty');

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/modal-playlist-add-track.hbs'),

	className: 'modal',

	childView: ViewPlaylistCheckbox,

	childViewContainer: 'fieldset',

	emptyView: ViewEmpty,

	events: {
		'click .cancel': '_remove',
		'click .save': '_onSavePlaylist',
		'click input[type="checkbox"]': '_onCheckbox'
	},
	
    initialize: function(options){

    	this.request = options.request;

		/*
		 *	Filter the collection to exclude the currently displayed playlist
		 */
		// debugger;
		var owner = dataStore.appModel.get('displayName');

		this.collection.each(function(model){ if(model.get('owner') !== owner){ this.collection.remove(model); }; }.bind(this));
		// this.playlists = _.filter(this.collection.toJSON(), function(e){ return e.owner === owner });

	},

	_onCheckbox: function(){
		
		if(this.el.querySelectorAll('input[type="checkbox"]:checked').length){
			this.el.querySelector('.save').removeAttribute('disabled');
		}else{
			this.el.querySelector('.save').setAttribute('disabled', 'disabled');
		}
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

		this._remove();
	},

	_onAnimationComplete: function(e){

		switch(e.animationName){
			case 'model-hide':
				this.remove();
				break;
		}
	},

	_remove: function(){

		this.el.addEventListener(animationEndEvent, this._onAnimationComplete, false);

		this.el.classList.add('remove');
	}
});