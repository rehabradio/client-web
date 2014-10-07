var Queues = require('./methods/queues');
var Playlists = require('./methods/playlists');
var Profile = require('./methods/profile');

var routerController = {};

_.extend(routerController, Playlists, Queues, Profile);

routerController.showSearch = function(params){

	var data = JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	
	dispatcher.trigger('router:showModule', 'search', data.query);
};

module.exports = routerController;
