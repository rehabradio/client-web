var io = require('socket.io-client');

function Sockets(){

	var login = this.login();

	login.done(this.onLoginDone.bind(this));



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
			url: 'http://radio-socket-server.herokuapp.com/login',
			type: 'GET'
		});
	},

	onLoginDone: function(data){

		var namespace = '/updates';
    	socket = io.connect('wss://radio-socket-server.herokuapp.com:80' + namespace, {'force new connection': true});

		socket.on('queues:updated', this.onQueuesUpdated);
		socket.on('queue:updated', this.onQueueUpdated);
    	socket.on('playlists:updated', this.onPlaylistsUpdated);
		socket.on('playlist:updated', this.onPlaylistUpdated);


    	// socket.on('message', this.onMessage);
    	// socket.on('connect', this.onConnect);
    	// socket.on('disconnect', this.onDisconnect);
    	// socket.on('error', this.onError);

    	// var socket = new WebSocket('wss://radio-socket-server.herokuapp.com');
    	// socket.onopen = this.onConnect;
    	// socket.onmessage = this.onMessage;
    	// socket.onclose = this.onDisconnect;
    	// socket.onerror = this.onError;

	},

	onQueuesUpdated: function(){
	},

	onQueueUpdated: function(queue){
	},

	onPlaylistsUpdated: function(){
		dispatcher.trigger('socket:playlists:updated', data);
	},

	onPlaylistUpdated: function(playlist){
	},


	onMessage: function(){
		debugger;
	},

	onConnect: function(){
		debugger;
	},

	onDisconnect: function(){
		debugger;
	},

	onError: function(){
		debugger;
	}
}

module.exports = new Sockets();