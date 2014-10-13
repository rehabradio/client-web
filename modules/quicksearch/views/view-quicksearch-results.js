var viewQuicksearchResult = require('../views/view-quicksearch-result')

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/view-quicksearch-results.hbs'),

	childView: viewQuicksearchResult,

	childViewContainer: '.results',

	initialize: function(){
		
	}
});