module.exports = Backbone.View.extend({

	tagName: 'li',

	events: {
		'click .vote': '_onVote',
		'click .delete': '_onDelete',
	},

	template: require('../templates/view-track.hbs'),

	initialize: function(){
		this.setElement(this.template(this.model.toJSON()));

		this.listenTo(this.model, 'remove', this._onDestroy);
	},

	render: function(){
		return this;
	},

	_onVote: function(e){

		var upVote = ($(e.target).hasClass('up') ? true : false);

		var data = {
			upVote: upVote
		};

		dispatcher.trigger('queue-track-vote', data);
	},

	_onDelete: function(){
		var trackId = this.model.get('track_id');

		dispatcher.trigger('delete-track-from-queue', trackId);
	},

	_onDestroy: function(){
		this.remove();
	}

});