var Queues = require('./methods/queues');
var Playlists = require('./methods/playlists');

var routerController = {};

_.extend(routerController, Playlists, Queues);

routerController.showSearch = function(params){

	var data = JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	
	dispatcher.trigger('router:showModule', 'search', data.query);
};

module.exports = routerController;
