var AppLayout = Marionette.LayoutView.extend({

	el: '#app',
	template: require('../templates/layout.hbs'),

	regions: {
		navigation: '#sidebar',
		main: 'main',
	},

});


module.exports = AppLayout;