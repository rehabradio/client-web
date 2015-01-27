var io = require('socket.io-client'),
	socket = io.connect(process.env.SOCKETS_URL + '/updates');

function Sockets(){

	socket.on('queues:updated', function(){
		
		dispatcher.trigger('socket:queues:updated');
	});

	socket.on('queue:updated', function(data){
		
		// dispatcher.trigger('socket:queues:tracks:updated', data);
	});

	socket.on('playlists:updated', function(data){
		
		// dispatcher.trigger('socket:playlists:updated', data);
	});

	socket.on('playlist:updated', function(data){
		
		// dispatcher.trigger('socket:playlists:tracks:updated', data);
	});


	socket.on('queue-head:updated', function(data){
		// dispatcher.trigger('socket:player:set', data);
	});
}

module.exports = new Sockets();