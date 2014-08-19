//queues methods

module.exports = {
	showQueues:function(){
		console.log('showQueues');
		dispatcher.trigger('router:showView', 'queue');
	},

	showQueue:function(){
		console.log('showQueue');
	},

	showQueueTracks:function(){
		console.log('showQueueTracks');
	},

	showQueueTrack:function(){
		console.log('showQueueTrack');
	}
};