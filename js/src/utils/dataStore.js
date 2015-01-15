var dataStore = {}

/*
 *	Requiring and initialising empty collections
 */

var createSubCollections = function(){
	console.log('test');
}

var PlaylistsCollection = require('../../../modules/playlists/collections/collection-playlists-all');
dataStore.playlistsCollection = new PlaylistsCollection();

var QueuesCollection = require('../../../modules/queues/collections/collection-queues-all');
dataStore.queuesCollection = new QueuesCollection();

module.exports = dataStore;