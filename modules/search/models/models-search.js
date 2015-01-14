module.exports = Backbone.Model.extend({
	defaults: {
		query: null,
		services: window.services,
		test: 'value'
	}
});