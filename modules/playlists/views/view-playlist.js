module.exports = Marionette.ItemView.extend({
	
	template: require('../templates/view-playlist.hbs'),

	events: {
		'click a': '_onShowTracks'
	},

	initialize: function(options){
		this.parent = options.parent;
	},

	_onShowTracks: function(e){

		//should raise an event to the core. From here the router's controller will action.
		//get playlist id = this.model.get('id');

		e.preventDefault();

		var config = {
			id:  this.model.get('id'),
			request: this.parent.collection.request
		};

		dispatcher.trigger('router:showTracks', config);

		//this.parent.model.set('playlist', this.model.get('id'));
		//dispatcher.trigger('tracks-show');
		//dispatcher.trigger('tracks-collection-reset', this.model.get('id'));
	}

});