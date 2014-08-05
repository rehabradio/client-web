Backbone = require('backbone');
$ = require('jquery');

Backbone.$ = $;

var Router = Backbone.Router.extend({

	initialize: function(){},
	routes: {}
});

var router = new Router();
Backbone.history.start({ pushState: true, start: true });

module.exports = router;