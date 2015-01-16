var dataStore = {}

/*
 *	Requiring and initialising empty collections
 */

dataStore.appModel = new (Backbone.Model.extend())();

var PlaylistsCollection = require('../../../modules/playlists/collections/collection-playlists-all');
dataStore.playlistsCollection = new PlaylistsCollection();

var QueuesCollection = require('../../../modules/queues/collections/collection-queues-all');
dataStore.queuesCollection = new QueuesCollection();

module.exports = dataStore;