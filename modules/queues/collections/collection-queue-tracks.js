var BaseCollection = require('../../core/base-collection');

var QueueTrack = require('../models/models-queue-tracks');

module.exports = BaseCollection.extend({

	model: QueueTrack,

	url: null,

	initialize: function(models, options){
		
		this.url = options.url;
		this.id = Number(options.id);

		dispatcher.on('socket:queues:tracks:update', this.update.bind(this));

		this.fetch();
	},

	comparator: function(element){
		return element.id;
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
		 *	Checks if the collection 'id' corresponds to the 'id' supplied in the data
		 */

		if(data.id === this.id){
			this.set(data, {parse: true});
		}
	}
	
});