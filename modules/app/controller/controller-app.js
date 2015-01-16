/**
* Controller for the Application Module
*
* @module Application
* @constructor
*/

var modelApp = require('../models/models-app'); // Already initialised
var AppLayout = require('../views/layout-app');
var AppRouter = require('../../core/router/router');

var Auth = require('../../auth/auth');
var Login = require('../../login/controller/controller-login');

var AppContent = require('../views/layout-app-content');

module.exports = Marionette.Controller.extend({

	model: modelApp,

	//modules that will be started as soon as the app boots
	//maybe move them into core, things like header, sidebar will go here
	coreModules: {
		player: require('../../player/controller/controller-player'),
		navigation : require('../../navigation/controller/controller-navigation'),
		quicksearch: require('../../quicksearch/controller/controller-quicksearch')
	},

	//views that are called by the router's controller, these views will be displayed within the 
	//layouts 'main' region
	viewModules: {
		profile: require('../../profile/controller/controller-profile'),
		search: require('../../search/controller/controller-search'),
		queues: require('../../queues/controller/controller-queues'),
		playlists: require('../../playlists/controller/controller-playlists')
	},


	initialize: function(){

		this.layout = new AppLayout({
			regions: {
				appContent: '#app-content'
			}
		});

		this.layout.render();

		this.auth = new Auth();

		this.listenTo(this.auth, 'login:status:signedin', this._setupAppData, this);
		this.listenTo(this.auth, 'login:status:signedout', this._setupAppLogin, this);

		// this.login = new Login();

		// this.login.once('login:status:signedin', this._setupAppData, this);

		// this.listenTo(this.login, 'login:status:signedout', function(){
		// 	this.layout.appContent.show(this.login.show());
		// });

	},

	_fetchData: function(){

		var deferred = $.Deferred();

		$.when(
			dataStore.playlistsCollection.fetch(),
			dataStore.queuesCollection.fetch()
		)
		.then(function() {
            deferred.resolve();
        });

		return deferred;
	},

	_setupAppData: function(){

		$.ajaxSetup({
            headers: { "X_GOOGLE_AUTH_TOKEN": gapi.auth.getToken().access_token }
        });

        var datastorePreloading = this._fetchData();

		$.when(datastorePreloading).then(function() {
			this.startApp();
        }.bind(this));

		this.model.set('url', this.auth.model.get('url'));
		this.model.set('displayName', this.auth.model.get('displayName'));
		this.model.set('image', this.auth.model.get('image.url'));
		this.model.set('loginStatus', true);
	},

	// setLoginStatus: function(status, user){

	// 	if(!!status){


	// 		this.model.set('loginStatus', status); // Triggers the rerender;

	// 	}else{

	// 		this.layout.appContent.show(this.login.show());
	// 	}
	// },

	startApp: function(){
		
		console.log('Start App');

		this.router = new AppRouter();

		this.appContent = new AppContent();
		this.layout.appContent.show(this.appContent);
	
		var self = this;

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

		this.listenTo(dispatcher, 'search:perform', this._onPerformSearch, this);


		Backbone.history.start({ pushState: true, trigger: true });

		/*
		 *	Initialise views that don't rely on external data // core modules
		 */

		console.log('booting views...');

		new this.coreModules.player(this);
		new this.coreModules.navigation(this);
		new this.coreModules.quicksearch(this);

	},

	_changeModule:function(module, data){

        this.router.navigate(module, {trigger: false});
		this.appContent.main.show( new this.viewModules[module]().show() );

    },

	_showModule:function(module, data){
		this.appContent.main.show( new this.viewModules[module](data).show() );
	},

	_onPerformSearch: function(query){
        this.router.navigate('search/?query=' + query, {trigger: false});
		this.appContent.main.show( new this.viewModules.search(query).show() );
	},

	_setupAppLogin: function(){
		dataStore.playlistsCollection.reset();
		dataStore.queuesCollection.reset();

		var login = new Login();

		this.listenTo(login, 'login:signin', function(){
			this.auth.signin();
		});

		this.layout.appContent.show(login.show());
	}

});