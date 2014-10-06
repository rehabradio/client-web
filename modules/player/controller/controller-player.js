var LayoutPlayer = require('../views/layout-player');
var ViewPlayerControl = require('../views/view-player-control');

module.exports = Marionette.Controller.extend({

	initialize: function(){
		this.layout = new LayoutPlayer({
			regions: {
				playerControl: '#player-control'
			}
		});

		var playerControl = new ViewPlayerControl();

		this.layout.playerControl.show(playerControl);

		this.layout.listenTo(playerControl, 'player:seekend', function(){
			
		});

		this.listenTo(dispatcher, 'socket:player:set', this._onPlayerSet, this);

	},

	_onPlayerSet: function(data){

		this.layout.playerControl.currentView._setPlayhead(data);

	}
});