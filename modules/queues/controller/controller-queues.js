var QueuesLayout = require('../views/layout-queues');
var QueuesList = require('../views/view-queues-list');
var ViewQueueTracks = require('../views/view-queue-tracks');
var CollectionQueueTracks = require('../collections/collection-queue-tracks');

module.exports = Marionette.Controller.extend({
	
	initialize: function(){
		this.layout = new QueuesLayout({
			regions: {
				currentTrack: '#current-track',
				queuesList: '#queues',
				queueTracks: '#queue-tracks'
			}
		});

		this.listenTo(this.layout, 'show', this.onShow);
	},

	show: function(){

		/*
		 *	Return queues layout view
		 */
		
		return this.layout;
	},

	onShow: function(){

		var self = this;

		var queuesList = new QueuesList();
		self.layout.queuesList.show(queuesList);

		self.layout.listenTo(queuesList, 'childview:queues:show', function(view, data){
			self._queueChange(data);
		});

		var QueuesRoute = Marionette.SubRouter.extend({

			controller: {

				loadPlaylist: self._queueChange.bind(self)
			},

			appRoutes: {
				':id': 'loadPlaylist'
			},
			
		});

		var queuesRoute = new QueuesRoute('queues');
	},

	_queueChange: function(id){

		var model = dataStore.queuesCollection.find(function(element){ return element.get('id') === id; });

		/*
		 *	Check if the collection exists in dataStore. If it doesn't, create it.
		 */

		if(!_.find(dataStore.queueTracksCollections, function(element){ return element.id === id; })){
			dataStore.queueTracksCollections.push(new CollectionQueueTracks([], {
				id: id,
				url: window.API_ROOT + 'queues/' + id + '/tracks/'
			}));
		}

		var viewQueueTracks = new ViewQueueTracks({
			model: model,
			collection: _.find(dataStore.queueTracksCollections, function(element){ return element.id === id; })
		});

		this.layout.queueTracks.show(viewQueueTracks);

		/*
		 *	Set up listeners 
		 */

		this.layout.listenTo(viewQueueTracks, 'childview:queues:tracks:remove', function(view, model){
			model.destroy();
		});

		/*
		 *	Update the url to reflect the current state of the app
		 */

		Backbone.history.navigate('queues/' + id, {trigger: false});

	}
});