var ViewQueueItem = require('./view-queues-list-item');

module.exports = Marionette.CompositeView.extend({

	collectionEvents: {
    	"add": "modelAdded"
  	},

	template: require('../templates/view-queues-list.hbs'),
	
	collection: dataStore.queuesCollection,

	childView: ViewQueueItem,

	childViewContainer: 'ul',

	initialize: function(){
		console.log(dataStore.queuesCollection);
		this.render();
	},

	modelAdded:function(model){

		console.log(model);
	}

});