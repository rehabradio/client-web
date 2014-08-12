var ModelApp = Backbone.Model.extend({
	defaults: {
		loginStatus: false,
		displayName: '',
		image: '',
		url: ''
	}
});

 module.exports = new ModelApp();