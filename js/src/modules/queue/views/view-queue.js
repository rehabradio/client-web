var QueueTrackView = require('./view-queue-track');

module.exports = Backbone.View.extend({

	el: '#queue',

	collection: dataStore.queueCollection,
	
	initialize: function(){

		this.listenTo(this.collection, 'add', this._addToQueue, this);

		this.$list = this.$el.find('ul');
		
		this.render();

	},

	render: function(){
		var self = this;

		self.collection.each(function(model, index){
			var trackView = new QueueTrackView({model: model});


			self.$list.append(trackView.render().$el);
		});
	},

	_addToQueue: function(model){

		console.log('queue item', model.toJSON() );


		var trackView = new QueueTrackView({model: model});

		this.$list.append(trackView.render().$el);
	}
});