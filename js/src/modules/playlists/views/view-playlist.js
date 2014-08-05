module.exports = Backbone.View.extend({

	tagName: 'li',

	template: require('../templates/view-playlist.hbs'),

	events: {
		'click a': '_onShowTracks'
	},

	initialize: function(){
		this.setElement(this.template(this.model.toJSON()));
	},

	render: function(){
		return this;
	},

	_onShowTracks: function(e){
		e.preventDefault();

		dispatcher.trigger('tracks-show');
		dispatcher.trigger('tracks-collection-reset', this.model.get('id'));
	}
});