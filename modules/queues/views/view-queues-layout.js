var ViewQueuesList = require('./view-queues-list'); //composite view
var ViewQueueTracks = require('./view-queue-tracks');
var CollectionQueueTracks = require('../collections/collection-queue-tracks');

module.exports = Marionette.LayoutView.extend({

	template: require('../templates/view-queues.hbs'),

	regions: {
		currentTrack: '#current-track',
		queuesList: '#queues',
		queueTracks: '#queue-tracks'
	},

	className: 'queue',

	initialize: function(){	
		dataStore.queueTracksCollections = [];
	},

	onRender: function() {

		// Render the list of queues available
      	this.queuesList.show(new ViewQueuesList());

      	//dispatcher.on('queue:change', this._queueChange, this); << causes problems with marionette cleanups, use listenTo
      	//http://stackoverflow.com/questions/16823746/backbone-js-listento-vs-on

      	this.listenTo(dispatcher, 'queue:change', this._queueChange, this);

      	//var initialQueueId = dataStore.queuesCollection.first().id;

		this._queueChange(1);

    },

	_queueChange: function(id){

		/*
		 *	id refers to the queue id
		 *	set the queue id in the main App Model so that it can be referenced in the view-app _addToQueue function
		 */

		dataStore.appModel.set('queueId', id);

		var model = dataStore.queuesCollection.find(function(element){ return element.get('id') === id; });

		// TODO - move to view-app
		/*
		 *	Check if the collection exists in dataStore. If it doesn't create it.
		 */

		if(!_.find(dataStore.queueTracksCollections, function(element){ return element.id === id; })){
			console.log('fired');
			dataStore.queueTracksCollections.push(new CollectionQueueTracks([], {
				id: id,
				url: window.API_ROOT + 'queues/' + id + '/tracks/'
			}));
		}

		this.queueTracks.show(new ViewQueueTracks({
			model: model,
			collection: _.find(dataStore.queueTracksCollections, function(element){ return element.id === id; })
		}));

	}
});