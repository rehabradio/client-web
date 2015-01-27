var io = require('socket.io-client'),
	// socket = io.connect('https://radio-socket-server.herokuapp.com/');
	socket = io.connect(process.env.SOCKETS_URL);

// socket.on('connection', function(data){
// 	debugger;
// });

function Sockets(){

	// websocket = new WebSocket('https://radio-socket-server.herokuapp.com/');
	websocket = new WebSocket(process.env.SOCKETS_URL);
    websocket.onopen = function(evt) { debugger; };
    websocket.onclose = function(evt) { debugger; };
    websocket.onmessage = function(evt) { debugger; };
    websocket.onerror = function(evt) { debugger; };

	// socket.on('queues:updated', function(){
		
	// 	dispatcher.trigger('socket:queues:updated');
	// });

	// socket.on('queue:updated', function(data){
		
	// 	// dispatcher.trigger('socket:queues:tracks:updated', data);
	// });

	// socket.on('playlists:updated', function(data){
		
	// 	// dispatcher.trigger('socket:playlists:updated', data);
	// });

	// socket.on('playlist:updated', function(data){
		
	// 	// dispatcher.trigger('socket:playlists:tracks:updated', data);
	// });


	// socket.on('queue-head:updated', function(data){
	// 	// dispatcher.trigger('socket:player:set', data);
	// });
}

module.exports = new Sockets();