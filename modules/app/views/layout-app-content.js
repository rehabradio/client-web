var ViewUser = require('../views/view-user');

module.exports = Marionette.LayoutView.extend({

	template: require('../templates/layout.hbs'),

	events: {
		'submit #search': '_onSearch'
	},

	regions: {
		navigation: '#navigation',
		main: 'main',
		user: '#user'
	},

	onRender:function(){
		this.user.show( new ViewUser() );
	},

	_onSearch: function(e){
		e.preventDefault();

		var formsData = this.$el.find('form').serializeArray();

		var query = formsData[0].value;

		dispatcher.trigger('search:perform', query);
	}

});