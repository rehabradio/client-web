module.exports = Marionette.LayoutView.extend({

	template: require('../templates/layout-profile.hbs'),

	className: 'module-profile',

	initialize: function(options){
		this.regions = options.regions;
	}
});