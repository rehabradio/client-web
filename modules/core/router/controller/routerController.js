var Queues = require('./methods/queues');
var Playlists = require('./methods/playlists');

var routerController = {
	home:function(){
		console.log('home!!');
	}
};

_.extend(routerController, Playlists, Queues);


module.exports = routerController;
