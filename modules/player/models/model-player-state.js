module.exports = Backbone.Model.extend({
	defaults: {
		// queue: dataStore.queuesCollection.at(0).get('id'),
		trackTitle: 'No Track available',
		totalTime: 0,
		totalTimeReadable: msToReadable(0),
		elapsedTime: 0,
		elapsedTimeReadable: msToReadable(0),
		timeOffset: 0
	},

	initialize: function(){

		this.listenTo(this, 'change:totalTime', this._setTotalTimeReadable, this);
		this.listenTo(this, 'change:elapsedTime', this._setElapsedTimeReadable, this);
	},

	_setTotalTimeReadable: function(){
		this.set('totalTimeReadable', msToReadable(this.get('totalTime')));
	},

	_setElapsedTimeReadable: function(){
		this.set('elapsedTimeReadable', msToReadable(this.get('elapsedTime')));
	}
});