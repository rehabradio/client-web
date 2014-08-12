var Marionette 	= require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
	className: "emptyView",
	template: require('../templates/emptyView.hbs')
});