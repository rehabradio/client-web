var dataStore = {}

/*
 *	Requiring and initialising empty collections
 */

var PlaylistsCollection = require('../../../modules/playlists/collections/collections-playlists');
dataStore.playlistsCollection = new PlaylistsCollection();

var TracksCollection = require('../../../modules/playlists/collections/collections-tracks');
dataStore.tracksCollection = new TracksCollection();

var QueueCollection = require('../../../modules/queues/collections/collection-queue');
dataStore.queueCollection = new QueueCollection();

var QueueTracksCollection = require('../../../modules/queues/collections/collection-queue-tracks');
dataStore.queueTracksCollection = new QueueTracksCollection();

module.exports = dataStore;