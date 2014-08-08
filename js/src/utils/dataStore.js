var dataStore = {}

/*
 *	Requiring and initialising empty collections
 */

var PlaylistsCollection = require('../../../modules/playlists/collections/collections-playlists');
dataStore.playlistsCollection = new PlaylistsCollection();

var TracksCollection = require('../../../modules/playlists/collections/collections-tracks');
dataStore.tracksCollection = new TracksCollection();

var QueueCollection = require('../../../modules/queue/collections/collection-queue');
dataStore.queueCollection = new QueueCollection();

module.exports = dataStore;