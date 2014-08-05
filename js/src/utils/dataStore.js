var dataStore = {}

var PlaylistsCollection = require('../modules/playlists/collections/collections-playlists');
dataStore.playlistsCollection = new PlaylistsCollection();

var QueueCollection = require('../modules/queue/collections/collection-queue');
dataStore.queueCollection = new QueueCollection();

var TracksCollection = require('../modules/tracks/collections/collections-tracks');
dataStore.tracksCollection = new TracksCollection();

module.exports = dataStore;