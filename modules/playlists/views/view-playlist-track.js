/*
 *	View for individual tracks within playlist
 */

module.exports = Backbone.View.extend({
  
	tagName: 'div',

	events: {
		'click button': '_onRemove'
	},

	className: 'track',

	template: require('../templates/view-playlist-track.hbs'),

	initialize: function(){

		this.listenTo(this, 'animation:remove', this._animationRemove, this);
		this.listenTo(this, 'this:remove', this._remove, this);
		this.listenTo(this.model, 'change', this.render, this);

		this.el.addEventListener(animationEndEvent, this._animationComplete.bind(this), false);
	},

	_onRemove: function(){
		
		this.model.destroy();

		// todos.remove(this.model);
	},

	_animationRemove: function(){
		this.el.classList.add('track-animation-remove');
	},

	_animationComplete: function(e){

		switch (e.animationName){
			case 'track-animation-add':
			this.el.classList.remove('track-animation-add');
			break;

			case 'track-animation-remove':
			this.remove();
			this.trigger('animation:remove:complete');
			break;
		}
	},

	_remove: function(){
		this._animationRemove();
	},

	_onChange: function(model){
		console.log(model);
	},

	render: function(){
		this.$el.empty();

		this.$el.addClass('track-animation-add');
		this.$el.append(this.template(this.model.toJSON()));


		return this;
	}
  
});