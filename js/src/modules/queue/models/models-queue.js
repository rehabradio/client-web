Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		previous: null,
		next: null
	}
});