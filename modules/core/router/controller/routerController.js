var Queues = require('./methods/queues');
var Playlists = require('./methods/playlists');

var routerController = {};

_.extend(routerController, Playlists, Queues);


module.exports = routerController;
