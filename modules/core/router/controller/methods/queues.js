//queues methods

module.exports = {
	showQueues:function(){
		
		var options = {
			path: 'queues'
		};

		dispatcher.trigger('router:showModule', 'queues', options);
	},

	showQueue:function(queueID){

		var options = {
			path: 'queues/' + queueID + '/'
		};

		dispatcher.trigger('router:showModule', 'queues', options);

	},

	showQueueTracks:function(){
		console.log('showQueueTracks');
	},

	showQueueTrack:function(){
		console.log('showQueueTrack');
	}
};