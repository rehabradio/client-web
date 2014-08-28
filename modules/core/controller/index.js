module.exports = Marionette.Controller.extend({

	//give each controller access to the main app layout and router instance
	constructor: function(options){
		
		this.layout = options.layout || null;
		this.router = options.router || null;

		Marionette.Controller.prototype.constructor.call(this, options);

	},

	changeModule:function( module ){

        console.log('changeModule');

     	switch(module) {
            case 'playlists':
                this.router.controller.showPlaylists();
                this.router.navigate('playlists', {trigger: false});
            break;
            case 'queues':
                this.router.controller.showQueues();
                this.router.navigate('queues', {trigger: false});
            break;
        }

    }

});