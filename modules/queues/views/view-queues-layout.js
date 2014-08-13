var ViewQueuesList = require('./view-queues-list');
var ViewQueueTracks = require('./view-queue-tracks');
var CollectionQueueTracks = require('../collections/collection-queue-tracks');

module.exports = Marionette.LayoutView.extend({

	el: '#queue',

	template: require('../templates/view-queues.hbs'),

	regions: {

		currentTrack: '#current-track',
		queuesList: '#queues',
		queueTracks: '#queue-tracks'
	},

	initialize: function(){

		var self = this;

		dispatcher.on('queue:change', self._queueChange.bind(self));

		// self.queues = [];

		// dataStore.queueCollection.each(function(model){

		// 	var queueId = model.get('id');

		// 	self.queues.push(new ViewQueueTracks({
		// 		model: model,
		// 		collection: new CollectionQueueTracks({
		// 			url: window.API_ENDPOINT + 'queues/' + queueId + '/tracks'
		// 		})
		// 	}));
		// });

		self.render();
		self.queuesList.show(new ViewQueuesList);
		// self.queueTracks.show(self.queues[0]);
	},

	_queueChange: function(id){

		var collection = new CollectionQueueTracks([], {
			url: 'http://localhost:8000/api/queues/' + id + '/tracks'
		});

		this.queueTracks.show(new ViewQueueTracks({
			// model: model,
			collection: collection
		}));

		// _.findWhere(this.queues, function(element){ return element.model.get('id') === id; });
	}
});