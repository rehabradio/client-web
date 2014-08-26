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
		}

		dispatcher.trigger('router:showModule', 'queues', options);

	},

	showQueueTracks:function(queueID){
		console.log('showQueueTracks');
	},

	showQueueTrack:function(queueID, trackID){
		console.log('showQueueTrack');
	}
};