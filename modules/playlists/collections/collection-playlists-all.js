var BaseCollection = require('../../core/base-collection');

var collectionPlaylistsPersonal = require('./collection-playlists-personal');
var collectionPlaylistsPublic = require('./collection-playlists-public');

var Playlist = require('../models/models-playlists');

module.exports = BaseCollection.extend({

	request: 'playlists',

	model: Playlist,

	initialize: function(){

		// dispatcher.on('socket:playlists:update', this.fetch, this);
		dispatcher.on('socket:playlists:update', function(){
			debugger;
		}, this);
	},

	parse: function(data){

		for(var i in data.results){
			if(data.results[i].owner === dataStore.appModel.get('displayName')){
				data.results[i].isOwner = true;
			}
		}

		// var queues = {},
		// 	owner = dataStore.appModel.get('displayName');

		// for(var i in data.results){

		// 	if(owner === data.results[i].owner){
		// 		dataStore.collectionPlaylistsPersonal.add(data.results[i]);
		// 	}else{
		// 		dataStore.collectionPlaylistsPublic.add(data.results[i]);
		// 	}
		// }

		return data.results;
	}

});