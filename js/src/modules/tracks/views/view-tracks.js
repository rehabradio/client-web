var TracksCollection = require('../collections/collections-tracks.js');
var TrackView = require('./view-track.js');

module.exports = Backbone.View.extend({

	el: '#tracks',

	collection: new TracksCollection(),

	initialize: function(){
		// this.listenTo(this.model, 'change', function(){
		// 	console.log('tracks model change');
		// 	// TODO - call collection fetch
		// 	this.collection._update(this.model.get('id'));

		// });

		// this.listenTo(this.collection, 'add', this._onTrackAdd);


		// TODO - Add to global dispatcher in App View
		dispatcher.on('tracks-add', this._onTrackAdd, this);
		
	},

	render: function(){

		return this;
	},

	_onTrackAdd: function(model){
		console.log(model);

		var $parent = this.$el.find('table');

		var view = new TrackView({
			model: model
		});

		$parent.append(view.render().$el);

		//build Views 
	}
});