module.exports = Backbone.View.extend({

	template: require('../templates/template-player-playbar.hbs'),

	initialize: function(){
		this.listenTo(this, 'player:playbar:set', this._onPlaybarSet, this);
	},

	render: function(){
		this.$el.empty();
		this.$el.append(this.template());
		return this;
	},

	_onPlaybarSet: function(offset){
		var rangeCurrent = this.el.querySelector('.range-current'),
			rangeControl = this.el.querySelector('.range-control');

		rangeCurrent.style.width = offset.toString() + '%';
        rangeControl.style.left = offset.toString() + '%';
	}
});