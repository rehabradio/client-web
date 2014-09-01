var ViewUser = require('../views/view-user');

var AppLayout = Marionette.LayoutView.extend({

	template: require('../templates/layout.hbs'),

	regions: {
		navigation: '#navigation',
		main: 'main',
		user: '#user'
	},

	onRender:function(){
		this.user.show( new ViewUser() );
	},

});


module.exports = AppLayout;