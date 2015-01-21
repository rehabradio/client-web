var Model = Backbone.Model.extend({
	defaults: {
		playerText: 'Queue is empty',
		totalTime: 10000,
		totalTimeReadable: '00:10',
		elapsedTime: 1000,
		elapsedTimeReadable: '00:01'
	}
});

module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-player.hbs'),

	model: new Model(),

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
	},



	_ticker: function(){
		
	}
});