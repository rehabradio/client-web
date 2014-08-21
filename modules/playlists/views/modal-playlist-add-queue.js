module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-playlist-add-queue.hbs'),

	events: {
		'click .cancel': 'remove',
		'click .save': '_onAddToQueue'
	},

	initialize: function(){

		

	},

	serializeData: function(){
		
		/*
		 *	Over-writes the default behaviour to render the collection instead of the model.
		 */

		var data = { items: _.partial(this.serializeCollection, this.collection).apply(this, arguments) };

		return data;
	},

	_onAddToQueue: function(){

		var formData = this.$el.find('form').serializeArray(),
			data = {};

		for(var i in formData){
			data = {
				queue: formData[i].name,
				track: this.model.get('track')
			}

			dispatcher.trigger('playlist:queue:add', data);	
		}

		this.remove();
	}
});