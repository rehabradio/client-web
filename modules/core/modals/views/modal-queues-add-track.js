module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-queues-add-track.hbs'),

	events: {
		'click .cancel': 'remove',
		'click .save': '_onAddToQueue'
	},

    onSave: function(){
    	console.log('modal save');
    },

	serializeData: function(){
		
		/*
		 *	Over-writes the default behaviour and instead render the collection instead of the model.
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

			this.trigger('queues:tracks:add', data)
		}

		this.remove();
	},

});