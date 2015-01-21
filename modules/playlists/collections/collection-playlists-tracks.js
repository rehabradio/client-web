/*
 *	Stores the data for tracks within a playlist.
 */
 
var BaseCollection = require('../../core/base-collection');

var TrackModel = require('../models/models-track.js');

module.exports = BaseCollection.extend({

	url: null,

	model: TrackModel,

	initialize: function(models, options){
		this.url = options.url;
		this.id = Number(options.id);

		this.fetch();

		this.listenTo(dispatcher, 'socket:playlists:tracks:update', this.update, this);
	},
	

	parse: function(res){

		var title, track;

		for(var i in res.results){

			title = '';
			track = res.results[i].track;

			title += track.name;

			if(track.album){
				title += (' - ' + track.album.name);
			}

			if(track.artists.length){
				title += (' - ' + track.artists[0].name);
			}

			var titleTruncated = title.substring(0, 60);
			
			if(title.length > 60){
				titleTruncated += '…';
			}

			res.results[i].title = title;
			res.results[i].titleTruncated = titleTruncated;
		}

		return res.results;
	},

	update: function(data){

		/*
		 *	Calls the build in 'set' method that merges the collection from the server with the current one.
		 */

		if(data.id === this.id){
			this.set(data, {parse: true});
		}
	}
});
