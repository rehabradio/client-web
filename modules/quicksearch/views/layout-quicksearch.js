/**
* Marionette Layout View for the Quicksearch Module
*
* @class LayoutQuicksearch
* @extends Quicksearch
* @contructor
*/

module.exports = Marionette.LayoutView.extend({

	el: '#search',

	template: require('../templates/layout-quicksearch.hbs'),
	
	initialize: function(){
		this.render();

	}
});