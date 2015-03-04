module.exports = Marionette.ItemView.extend({

	template: require('../templates/modal-queues-add-track.hbs'),

	className: 'modal',

	events: {
		'click .cancel': '_remove',
		'click .save': '_onAddToQueue'
	},

    onSave: function(){
    	console.log('modal save');
    },

    initialize: function(options){
    	this.request = options.request;
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

			(function(queue){
				this.request.done(function(response){

					this.trigger('queues:tracks:add', {queue: queue, track: response.id});
					
				}.bind(this));
			}.bind(this))(formData[i].name);
		}

		this._remove();
	},

	_onAnimationComplete: function(e){

		switch(e.animationName){
			case 'model-hide':
				this.remove();
				break;
		}
	},

	_remove: function(){

		this.el.addEventListener(animationEndEvent, this._onAnimationComplete, false);

		this.el.classList.add('remove');
	}

});