var ViewPlayerPlaybar = require('../views/view-player-playbar'),
	ViewPlayerSelect = require('../views/view-player-select');

module.exports = Marionette.ItemView.extend({

	template: require('../templates/template-player.hbs'),

	initialize: function(){
	},

	onRender: function(){

		var viewPlayerPlaybar = new ViewPlayerPlaybar();
		var playbar = this.el.querySelector('#playbar');

		playbar.appendChild(viewPlayerPlaybar.render().el);

		var viewPlayerSelect = new ViewPlayerSelect();
		var playerQueueSelect = this.el.querySelector('.player-queue-select');

		playerQueueSelect.appendChild(viewPlayerSelect.render().el);

		//Using a Web Component 

		// this.range = this.el.querySelector('input[type="range"]');

		// this.range.addEventListener('onseek', function(){
		// }, false);

		// this.range.addEventListener('onseekend', function(e){

		// 	this.trigger('player:seekend', e.value);
		// }.bind(this), false);

	},

	_setPlayhead: function(value){
		this.range.setValue(value);
	},



	_ticker: function(){
		
	}
});