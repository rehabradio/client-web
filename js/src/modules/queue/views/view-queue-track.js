var Backbone = require('backbone'),
$ = require('jquery');

Backbone.$ = $;

var dispatcher = require('../../../utils/dispatcher');

module.exports = Backbone.View.extend({

	tagName: 'li',

	events: {
		'click .vote': '_onVote',
	},

	template: require('../templates/view-track.hbs'),

	initialize: function(){
		this.setElement(this.template(this.model.toJSON()));
	},

	render: function(){
		return this;
	},

	_onVote: function(e){

		var upVote = ($(e.target).hasClass('up') ? true : false);

		data = {
			upVote: upVote
		};

		dispatcher.trigger('queue-track-vote', data);
	}

});