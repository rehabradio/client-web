var QueuesLayout = require('../views/layout-queues');

module.exports = Marionette.Controller.extend({
	
	initialize: function(){
		this.layout = new QueuesLayout();
	},

	show: function(){

		/*
		 *	Return queues layout view
		 */
		
		return this.layout;
	}
});