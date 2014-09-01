var MainLayout = Marionette.LayoutView.extend({

	el: '#rehabradio',
	template: require('../templates/main.hbs'),

	regions: {
		main: "#main"
	},

});


module.exports = MainLayout;