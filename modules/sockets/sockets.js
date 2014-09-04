var io = require('socket.io-client'),
	socket = io();

function Sockets(){

	socket.on('queues:update', function(data){
		
		dispatcher.trigger('socket:queues:update', data);
	});

	socket.on('queues:tracks:update', function(data){
		
		dispatcher.trigger('socket:queues:tracks:update', data);
	});

	socket.on('playlists:update', function(data){
		
		dispatcher.trigger('socket:playlists:update', data);
	});

	socket.on('playlists:tracks:update', function(data){
		
		dispatcher.trigger('socket:playlists:tracks:update', data);
	});
}

module.exports = new Sockets();