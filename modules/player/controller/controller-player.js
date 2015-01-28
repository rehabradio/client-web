var LayoutPlayer = require('../views/layout-player'),
	ViewPlayerControl = require('../views/view-player-control');

module.exports = Marionette.Controller.extend({

	startTime: 0,

	currentTime: 0,

	initialize: function(){
		this.layout = new LayoutPlayer({
			regions: {
				playerControl: '#player-control'
			}
		});


		$.ajax({
			url: window.API_ROOT + 'queues/' + dataStore.queuesCollection.at(0).get('id') + '/head/'
		})
		.done(function(track){

			var trackDetails = track.track;

			var title = trackDetails.name;

			if(trackDetails.album){
				title += (' - ' + trackDetails.album.name);
			}

			if(trackDetails.artists.length){
				title += (' - ' + trackDetails.artists[0].name);
			}

			var Model = Backbone.Model.extend({
				defaults: {
					playerText: title,
					totalTime: trackDetails.duration_ms,
					totalTimeReadable: '00:00',
					elapsedTime: 0,
					elapsedTimeReadable: '00:00'
				}
			});

			this.playerControl = new ViewPlayerControl({
				model: new Model()
			});

			this.startTime = performance.now();
			this._tick()/// NEEDS TO BE FIXED - Use SOCKETS to get state

			this.layout.playerControl.show(this.playerControl);

		}.bind(this))

		// this.listenTo(dispatcher, 'socket:player:set', this._onPlayerSet, this);
		this.listenTo(dispatcher, 'socket:player:change', this._onPlayerChange, this);

	},

	_onPlayerChange: function(){
		this.playerControl.model.set()
	},

	_onPlayerSet: function(data){

		this.layout.playerControl.currentView._setPlayhead(data);

	},


	_tick: function(){

		// if(this.state === 'playing'){
			this.currentTime = performance.now() - this.startTime;

			var timeDelta = this.currentTime / this.playerControl.model.get('totalTime');

			// THINK OF A BETTER WAY TO DO THIS
			dispatcher.trigger('player:playbar:set', timeDelta);
		// }

		requestAnimationFrame(this._tick.bind(this));
	}
});
