module.exports = Backbone.Model.extend({

	url: window.API_ROOT + 'users/',

	initialize: function(){

		this.fetch();
	},

	parse: function(data){
		var displayName = dataStore.appModel.get('displayName');

		var profileInfo = _.extend(dataStore.appModel.toJSON(), _.findWhere(data.results, function(element){ return element.username === displayName; }));

		return profileInfo;
	}
});