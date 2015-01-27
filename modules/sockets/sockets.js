var io = require('socket.io-client');

function Sockets(){
	var login = this.login();

	login.done(this.onLoginDone);
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

Sockets.prototype = {

	login: function(){
		return $.ajax({
			url: 'http://rehabradio.herokuapp.com/login',
			type: 'GET'
		});
	},

	onLoginDone: function(data){
		debugger;

		namespace = '/updates';
    	socket = io.connect('wss://radio-socket-server.herokuapp.com/');

    	socket.on('connect', this.onConnection);

	},

	onConnection: function(){
		debugger;
	},

	onError: function(){
		debugger;
	}
}

module.exports = new Sockets();