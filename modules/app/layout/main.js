var MainLayout = Marionette.LayoutView.extend({

	el: '#app',
	template: require('../templates/main.hbs'),

	regions: {
		main: "main"
	},

});


module.exports = MainLayout;