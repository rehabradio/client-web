var dataStore = {}

/*
 *	Requiring and initialising empty collections
 */

var PlaylistsCollection = require('../../playlists/collections/collections-playlists');
dataStore.playlistsCollection = new PlaylistsCollection();

// var TracksCollection = require('../../../modules/playlists/collections/collections-tracks');
// dataStore.tracksCollection = new TracksCollection();

var QueuesCollection = require('../../queues/collections/collection-queues-all');
dataStore.queuesCollection = new QueuesCollection();

module.exports = dataStore;