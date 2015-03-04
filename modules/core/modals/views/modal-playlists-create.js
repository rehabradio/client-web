module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-playlist-create.hbs'),

	className: 'modal',

	events: {
		'click .cancel': '_remove',
		'click .save': '_onSavePlaylist'
	},

	initialize: function(){

	},

	_onSavePlaylist: function(){
		
		var data = {
			name: this.el.querySelector('input[name="playlist-create-name"]').value,
			description: this.el.querySelector('input[name="playlist-create-description"]').value
		};

		this.trigger('playlist:create:confirm', data);
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