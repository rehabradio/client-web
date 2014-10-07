module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-player.hbs'),

	initialize: function(){
	},

	onRender: function(){

		this.range = this.el.querySelector('input[type="range"]');

		this.range.addEventListener('onseek', function(){
		}, false);

		this.range.addEventListener('onseekend', function(e){

			this.trigger('player:seekend', e.value);
		}.bind(this), false);


	},

	_setPlayhead: function(value){
		this.range.setValue(value);
	}
});