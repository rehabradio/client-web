module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-playlist-delete.hbs'),

	className: 'modal',

	events: {
		'click .cancel': '_remove',
		'click .save': '_onSavePlaylist'
	},

	_onSavePlaylist: function(){
		
		this.trigger('playlist:delete:confirm', this.model);
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