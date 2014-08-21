module.exports = Marionette.Controller.extend({

	//give each controller access to the main app layout and router instance
	constructor: function(options){
		this.layout = options.layout || null;
		this.router = options.router || null;

		Marionette.Controller.prototype.constructor.call(this, options);
	}
});