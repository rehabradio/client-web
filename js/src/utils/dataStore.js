var dataStore = {}

PlaylistsCollection = require('../modules/playlists/collections/collections-playlists');
dataStore.playlistsCollection = new PlaylistsCollection();

QueueCollection = require('../modules/queue/collections/collection-queue');
dataStore.queueCollection = new QueueCollection();

// var set

// var datastorePreloading = this.setupDatastore();

// $.when(datastorePreloading).then(function() {
//     eventBus.trigger(config.eventKeys.loadManagerCompleted);
// });


// var deferred = $.Deferred();

// dataStore.clients = new Clients();
// dataStore.employees = new Employees();
// dataStore.projects = new Projects();
// dataStore.milestones = new Milestones();
// dataStore.blocks = new Blocks();

// $.when(
//    dataStore.clients.fetch(),
//    dataStore.employees.fetch(),
//    dataStore.projects.fetch(),
//    dataStore.milestones.fetch(),
//    dataStore.blocks.fetch({silent: true})
// ).then(function() {
//     deferred.resolve();
// });

// return deferred;

module.exports = dataStore;