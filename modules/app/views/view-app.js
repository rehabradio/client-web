
var modelApp = require('../models/models-app'); // Already initialised
var ViewUser = require('./view-user');
var AppLayout = require('../layout/layout');
var AppRouter = require('../../core/router/router');

module.exports = Backbone.View.extend({

	el: '#app',

	model: modelApp,

	children: [],

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

		 //Store a reference to all appModules
		this.appModules = _.extend(this.coreModules, this.viewModules);

		this.router = new AppRouter();

		
		//Create an overall App Layout and render it
		this.layout = new AppLayout( this );
		this.layout.render();

		var viewUser = new ViewUser();

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