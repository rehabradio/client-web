var BaseCollection = require('../../core/base-collection');

var collectionPlaylistsPersonal = require('./collection-playlists-personal');
var collectionPlaylistsPublic = require('./collection-playlists-public');

var Playlist = require('../models/models-playlists');

module.exports = BaseCollection.extend({

	request: 'playlists',

	model: Playlist,

	initialize: function(){
		dataStore.collectionPlaylistsPersonal = collectionPlaylistsPersonal;
		dataStore.collectionPlaylistsPublic = collectionPlaylistsPublic;

		/*
		 *	Calls the fetch function to update instead of using update with data supplied through the socket
		 */

		dispatcher.on('socket:playlists:update', this.fetch.bind(this));
	},

	parse: function(data){

		var queues = {},
			owner = dataStore.appModel.get('displayName');

		for(var i in data.results){

			if(owner === data.results[i].owner){
				dataStore.collectionPlaylistsPersonal.add(data.results[i]);
			}else{
				dataStore.collectionPlaylistsPublic.add(data.results[i]);
			}
		}

		return data.results;
	},

});