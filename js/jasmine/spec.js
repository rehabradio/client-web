/*
 *	Require global librarys and put them on the global scope
 */

Backbone = require('backbone');
_ = require('underscore');
$ = require('jquery');

/*
 *	Tell Backbone to use jQuery
 */

Backbone.$ = $;

/*
 *	Load in Mock Data
 */

dataQueue = require('./data/queue');
dataPlaylists = require('./data/playlists');
dataTracks = require('./data/tracks');

var mockjax = require('../../node_modules/jquery-mockjax/jquery.mockjax');

$.mockjax({
	url: 'http://localhost:8000/api/queue',
	responseTime: 750,
	responseText: dataQueue
});

$.mockjax({
	url: 'http://localhost:8000/api/playlists',
	responseTime: 750,
	responseText: dataPlaylists
});

$.mockjax({
	url: 'add/to/queue', // TODO - update when available
	responseTime: 750
});

$.mockjax({
	url: 'remove/from/queue', // TODO - update when available
	responseTime: 750
});

dataStore = require('../src/utils/dataStore');

dataStore.playlistsCollection.fetch({
	url: 'http://localhost:8000/api/playlists',
	async: false
});

dataStore.queueCollection.fetch({
	url: 'http://localhost:8000/api/queue',
	async: false
});