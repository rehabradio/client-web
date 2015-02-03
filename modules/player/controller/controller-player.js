var LayoutPlayer = require('../views/layout-player'),
	ViewPlayerControl = require('../views/view-player-control'),
	ModelPlayerState = require('../models/model-player-state');

module.exports = Marionette.Controller.extend({


	initialize: function(){
		this.layout = new LayoutPlayer({
			regions: {
				playerControl: '#player-control'
			}
		});

		var modelPlayerState = new ModelPlayerState();

		var playerControl = new ViewPlayerControl({
			model: modelPlayerState
		});

		this.layout.playerControl.show(playerControl);
		
	},

	_onPlayerChange: function(){
		this.playerControl.model.set()
	}
});
