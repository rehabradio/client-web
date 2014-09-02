module.exports = Marionette.LayoutView.extend({

	el: '#app',

	template: require('../templates/app-content.hbs'),

	initialize: function(options){
		this.regions = options.regions;
	}
});