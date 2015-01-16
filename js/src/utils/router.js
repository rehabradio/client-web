/**
* 
* Provides first level routing.
*
* @class Router
* @extends Application
*/

var Router = Backbone.Router.extend({

	initialize: function(){},
	routes: {}
});

var router = new Router();
Backbone.history.start({ pushState: true, start: true });

module.exports = router;