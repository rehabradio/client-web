/*
 *	View for individual tracks within playlist
 */

module.exports = Backbone.View.extend({
  
	initialize: function(){

		this.listenTo(this, 'animation:remove', this._animationRemove, this);
		this.listenTo(this, 'this:remove', this._remove, this);
		this.listenTo(this.model, 'change', this.render, this);

		this.el.addEventListener(animationEndEvent, this._animationComplete.bind(this), false);
	},

	_onRemove: function(){
		
		this.model.destroy();
	},

	_animationRemove: function(){
		this.el.classList.add(this.animationNameRemove);
	},

	_animationComplete: function(e){

		switch (e.animationName){
			case this.animationNameAdd:
			this.el.classList.remove(this.animationNameAdd);
			break;

			case this.animationNameRemove:
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

		this.$el.addClass(this.animationNameAdd);
		this.$el.append(this.template(this.model.toJSON()));


		return this;
	}
  
});