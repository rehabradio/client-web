module.exports = Marionette.LayoutView.extend({

	el: '#search',

	template: require('../templates/layout-quicksearch.hbs'),
	
	initialize: function(){
		this.render();

	}
});