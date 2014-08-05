var Backbone = require('backbone'),
$ = require('jquery');
Backbone.$ = $;

var QueueCollection = require('../collections/collection-queue');
var QueueTrackView = require('./view-queue-track');

module.exports = Backbone.View.extend({

	el: '#queue',

	collection: new QueueCollection(),
	
	initialize: function(){

		this.listenTo(this.collection, 'add', this._addToQueue, this);
		this.collection.fetch();
	},

	_addToQueue: function(model){

		console.log('queue item', model.toJSON() );

		var $parent = this.$el.find('ul');

		var trackView = new QueueTrackView({model: model});

		$parent.append(trackView.render().$el);
	}
});