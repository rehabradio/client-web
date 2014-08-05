// var Backbone = require('backbone'),
// $ = require('jquery');
// Backbone.$ = $;

datastore = require('../../../utils/datastore');

var QueueTrackView = require('./view-queue-track');

module.exports = Backbone.View.extend({

	el: '#queue',

	collection: dataStore.queueCollection,
	
	initialize: function(){

		this.listenTo(this.collection, 'add', this._addToQueue, this);
	},

	_addToQueue: function(model){

		console.log('queue item', model.toJSON() );

		var $parent = this.$el.find('ul');

		var trackView = new QueueTrackView({model: model});

		$parent.append(trackView.render().$el);
	}
});