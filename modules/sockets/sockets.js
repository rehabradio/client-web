var io = require('socket.io-client');

function Sockets(){

	// var login = this.login();

	// login.done(this.onLoginDone.bind(this));

	this.onLoginDone();


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

		socket.on('queue-head:updated', this.onPlayheadUpdated);

		socket.on('error', this.onError);

	},

	onQueuesUpdated: function(){
		dispatcher.trigger('socket:queues:update');
	},

	onQueueUpdated: function(queue){
		dispatcher.trigger('socket:queue:update', queue);
	},

	onPlaylistsUpdated: function(){
		dispatcher.trigger('socket:playlists:update');
	},

	onPlaylistUpdated: function(playlist){
		dispatcher.trigger('socket:playlist:update', playlist);
	},

	onPlayheadUpdated: function(data){
		console.log('test', data);
	},


	onError: function(error){
	}
}

module.exports = new Sockets();