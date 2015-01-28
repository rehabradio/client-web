module.exports = Backbone.View.extend({

	tagName: 'select',

	initialize: function(){

	},

	render: function(){
		dataStore.queuesCollection.each(function(queue){
			var option = document.createElement('option'),
				value = document.createTextNode(queue.get('name'));

			option.setAttribute('value', queue.get('name'));
			option.appendChild(value);

			this.el.appendChild(option);
		}.bind(this));

		return this;
	}
});