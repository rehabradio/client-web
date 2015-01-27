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

		this.listenTo(dispatcher, 'socket:playlist:update', this.update, this);
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

		if(data.id === this.id){
			this.fetch();
		}
	}
});
