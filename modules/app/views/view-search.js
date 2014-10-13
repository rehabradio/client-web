module.exports = Backbone.View.extend({

	el: '#search',

	events: {
		'submit': '_onSubmit',
		'input change': '_onQueryChange'
	},

	initialize: function(){

	},

	_onSubmit: function(){
		console.log('load serach module')
	},

	_onQueryChange: function(){
		console.log('query update');
	}
});