var Queues = require('./methods/queues');
var Playlists = require('./methods/playlists');

var routerController = {};

_.extend(routerController, Playlists, Queues);

routerController.showSearch = function(data){
	dispatcher.trigger('router:showModule', 'search');
};

module.exports = routerController;
