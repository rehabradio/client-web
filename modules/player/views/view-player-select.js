module.exports = Backbone.View.extend({

	tagName: 'select',

	events: {
		'change': '_onChange'
	},

	initialize: function(){

	},

	render: function(){
		dataStore.queuesCollection.each(function(queue){
			var option = document.createElement('option'),
				value = document.createTextNode(queue.get('name'));

			option.setAttribute('value', queue.get('id'));
			option.appendChild(value);

			this.el.appendChild(option);
		}.bind(this));

		return this;
	},

	_onChange: function(e){
		this.trigger('player:queue:change', e.currentTarget.value);
	}
});