var ViewPlayerPlaybar = require('../views/view-player-playbar'),
	ViewPlayerSelect = require('../views/view-player-select');

module.exports = Marionette.ItemView.extend({

	template: require('../templates/template-player.hbs'),

	initialize: function(){
		this.listenTo(this.model, 'change:totalTimeReadable', this._setTotalTimeReadable, this);
		this.listenTo(this.model, 'change:elapsedTimeReadable', this._setElapsedTimeReadable, this);
		this.listenTo(this.model, 'change:timeOffset', this._setTimeOffset, this);
		this.listenTo(this.model, 'change:trackTitle', this._setPlayerText, this);

		$.ajax({
			url: window.API_ROOT + 'queues/' + dataStore.queuesCollection.at(0).get('id') + '/head/'
		})
		.done(this._setData.bind(this));

		this.startTime = performance.now();
		this._tick();
	},

	onRender: function(){


		this.viewPlayerPlaybar = new ViewPlayerPlaybar();
		var playbar = this.el.querySelector('#playbar');

		playbar.appendChild(this.viewPlayerPlaybar.render().el);

		var viewPlayerSelect = new ViewPlayerSelect();
		var playerQueueSelect = this.el.querySelector('.player-queue-select');

		playerQueueSelect.appendChild(viewPlayerSelect.render().el);

		this.listenTo(viewPlayerSelect, 'player:queue:change', this._setQueue, this);

		//Using a Web Component 

		// this.range = this.el.querySelector('input[type="range"]');

		// this.range.addEventListener('onseek', function(){
		// }, false);

		// this.range.addEventListener('onseekend', function(e){

		// 	this.trigger('player:seekend', e.value);
		// }.bind(this), false);

	},

	_setData: function(track){

		var trackDetails = track.track;

		var title = trackDetails.name;

		if(trackDetails.album){
			title += (' - ' + trackDetails.album.name);
		}

		if(trackDetails.artists.length){
			title += (' - ' + trackDetails.artists[0].name);
		}

		this.model.set('trackTitle', title);
		this.model.set('totalTime', trackDetails.duration_ms);
		this.model.set('totalTimeReadable', msToReadable(trackDetails.duration_ms));
		this.model.set('elapsedTime', track.time_position);
		this.model.set('elapsedTimeReadable', msToReadable(track.time_position));

	},

	_getQueueHeadInfo: function(queue){
		return $.ajax({
			url: window.API_ROOT + 'queues/' + queue + '/head/'
		});
	},

	_setQueue: function(queue){
		
		this._getQueueHeadInfo(queue).done(this._setData.bind(this));
	},

	_setTimeOffset: function(){

		try{
			this.viewPlayerPlaybar.trigger('player:playbar:set', this.model.get('timeOffset'));
		}catch(e){

		}
	},

	_setPlayerText: function(){

		var trackTitle = this.el.querySelector('.player-info');
		trackTitle.innerText = this.model.get('trackTitle');
	},

	_setTotalTimeReadable: function(){
		var totalTime = this.el.querySelector('.total-time');
		totalTime.innerText = this.model.get('totalTimeReadable');
	},

	_setElapsedTimeReadable: function(){
		var elapsedTime = this.el.querySelector('.elapsed-time');
		elapsedTime.innerText = this.model.get('elapsedTimeReadable');
	},

	startTime: 0,

	currentTime: 0,

	_tick: function(){



		// if(this.state === 'playing'){
			this.currentTime = performance.now();

			var timeDelta = this.currentTime - this.startTime;
			var elapsedTime = this.model.get('elapsedTime');
			var timeOffset = elapsedTime / this.model.get('totalTime');

			this.model.set('elapsedTime', timeDelta + elapsedTime);
			this.model.set('timeOffset', timeOffset);

			this.startTime = this.currentTime;
		// }


		requestAnimationFrame(this._tick.bind(this));
	}
});