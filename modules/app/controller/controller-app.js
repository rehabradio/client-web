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

		dataStore.appModel = this.model;

		this.layout.render();

		this.auth = new Auth();

		this.listenTo(dispatcher, 'auth:signin', function(){
			this.auth.trigger('auth:signin');
		}, this);

		this.listenTo(dispatcher, 'auth:signout', function(){
			this.auth.trigger('auth:signout');
		}, this);

		this.listenTo(this.auth, 'auth:status:signedin', this._setupAppData, this);
		this.listenTo(this.auth, 'auth:status:signedout', this._setupAppLogin, this);

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

		this.model.set('url', this.auth.model.get('profile').url);
		this.model.set('displayName', this.auth.model.get('profile').displayName);
		this.model.set('image', this.auth.model.get('profile').image.url);
		this.model.set('loginStatus', true);

		$.ajaxSetup({
            headers: { "X_GOOGLE_AUTH_TOKEN": gapi.auth.getToken().access_token }
        });

        var datastorePreloading = this._fetchData();

		$.when(datastorePreloading).then(function() {
			this.startApp();
        }.bind(this));

	},

	startApp: function(){
		
		console.log('Start App');

		this.router = new AppRouter();

		this.appContent = new AppContent();
		this.layout.appContent.show(this.appContent);
	
		var self = this;

		
sockets = require('../../../modules/sockets/sockets');


		/*
		 *	Stores global information for the app. Examples include login information and queue information
		 */


		console.log('App Initialised');

		/*
		 *	Assign events to the global dispatcher
		 */

		console.log('Creating global events...');

		this.listenTo(dispatcher, 'router:showModule', this._showModule, this);
		this.listenTo(dispatcher, 'navigation:changemodule', this._changeModule, this);

		this.listenTo(dispatcher, 'search:perform', this._onPerformSearch, this);

		/*
		 *	Initialise views that don't rely on external data // core modules
		 */

		console.log('booting views...');


		new this.coreModules.player(this);
		new this.coreModules.navigation(this);
		new this.coreModules.quicksearch(this);

		if(!Backbone.History.started){
			Backbone.history.start({ pushState: true, trigger: true });
		}else{

			if(Backbone.history.fragment.indexOf('playlists') > -1){
				this._showModule('playlists');

			}else if(Backbone.history.fragment.indexOf('queues') > -1){
				this._showModule('queues');

			}else if(Backbone.history.fragment.indexOf('profile') > -1){
				this._showModule('profile');
				
			}else if(Backbone.history.fragment.indexOf('search') > -1){
				this._showModule('search');			
			}
		}



	},

	_changeModule:function(module, data){

		dispatcher.trigger('navigation:ui:update', module);

        this.router.navigate(module, {trigger: false});
		this.appContent.main.show( new this.viewModules[module]().show() );

    },

	_showModule:function(module, data){
		
		dispatcher.trigger('navigation:ui:update', module);
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

		this.layout.appContent.show(login.show());
	}

});