var Marionette = require('backbone.marionette');
var RouterController = require('./controller/routerController');

var Router = Marionette.AppRouter.extend({

	//Controller contains the methods that are mapped from appRoutes

	controller: RouterController,

	//http://server-core.herokuapp.com/api/docs/  < api endpoints
	//Trigger methods in the controller for showing/swapping views within the main region.

	appRoutes: {

    	//Playlist Endpoints
    	'playlists' : 'showPlaylists',
    	'playlists/:id': 'showPlaylist',
    	'playlists/:id/tracks' : 'showPlaylistTracks',
    	'playlists/:id/tracks/:id' : 'showPlaylistTrack',

    	//Queue Endpoints
    	'queues': 'showQueues',
    	'queues/:id' : 'showQueue',
    	'queues/:id/tracks' : 'showQueueTracks',
    	'queues/:id/tracks/:id' : 'showQueueTrack'

    	//Search Endpoints

  	}
});


module.exports = Router;