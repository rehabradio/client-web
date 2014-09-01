var modelApp = require('../models/models-app'); // Already initialised
var AppLayout = require('../layout/layout');
var AppRouter = require('../../core/router/router');
var Login = require('../../login/');

var Layouts = {
	main : require('../layout/main'),
	application : require('../layout/layout')
};

module.exports = Marionette.Controller.extend({

	model: modelApp,

	//modules that will be started as soon as the app boots
	//maybe move them into core, things like header, sidebar will go here
	coreModules: {
		search: require('../../search/controller/controller-search'),
		navigation : require('../../navigation/controller/controller-navigation')
	},

	//views that are called by the router's controller, these views will be displayed within the 
	//layouts 'main' region
	viewModules: {
		queues: require('../../queues/controller/controller-queues'),
		playlists: require('../../playlists/controller/controller-playlists')
	},

	initialize: function(){

		this.appModules = _.extend(this.coreModules, this.viewModules);

		//render a layout with a main region for 
		//switching between login View and the Application Layout
		this.MainLayout = new Layouts.main();
		this.MainLayout.render();

		//create a new instance of the login module controller
		this.login = new Login(this);

		this.listenTo(dispatcher, 'login-set-status', this.setLoginStatus, this);
		
		this.listenTo(this.model, 'change:loginStatus', function(model){
			if(model.get('loginStatus')){
				this._startApp();
			}
		});

		for(var view in this.coreModules){
			this.children.push( new this.coreModules[view]() );
		}

		dispatcher.on('login-set-status', this.setLoginStatus.bind(this));

	},

	setLoginStatus: function(status, user){

		if(!!user){
			this.model.set('url', user.url);
			this.model.set('displayName', user.displayName);
			this.model.set('image', user.image.url);
		}

		this.model.set('loginStatus', status); // Triggers the rerender;

	},

	_startApp: function(){
		
		console.log('_startApp');

		this.router = new AppRouter();

		//Application layout
		//render the Application layout when logged in
		this.layout = new Layouts.application(this);
		this.MainLayout.main.show( this.layout );
	
		var self = this;

		self._fetchData();

		/*
		 *	Stores global information for the app. Examples include login information and queue information
		 */

		this.model = dataStore.appModel = modelApp;

		console.log('App Initialised');

		/*
		 *	Assign events to the global dispatcher	
		 */

		console.log('Creating global events...');

		this.listenTo(dispatcher, 'router:showModule', this._showModule, this);
		this.listenTo(dispatcher, 'navigation:changemodule', this._changeModule, this);


		Backbone.history.start({ pushState: true, trigger: true });
		/*
		 *	Initialise views that don't rely on external data // core modules
		 */

		console.log('booting views...');

		// new this.coreModules.navigation(this);
		// new this.coreModules.search(this);
	},

	_changeModule:function( module ){

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

    },

	_showModule:function( module ){

		this.layout.main.show( new this.viewModules[module]().show() );
	},
	
	_fetchData: function(){

		dataStore.playlistsCollection.fetch();
		dataStore.queuesCollection.fetch();
	},

});