
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
		navigation : require('../../navigation/')
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

		var self = this;


        self._fetchData();

		/*
		 *	Stores global information for the app. Examples include login information and queue information
		 */

		dataStore.appModel = modelApp;

		this.model = dataStore.appModel;

		console.log('App Initialised');

		/*
		 *	Assign events to the global dispatcher	
		 */

		 // TODO - come up with better event names

		console.log('Creating global events...');


		this.listenTo(dispatcher, 'router:showModule', this._showModule, this);
		//this.listenTo(dispatcher, 'router:triggerController', this._triggerRouterController, this);



		Backbone.history.start({ pushState: true, trigger: true });
		/*
		 *	Initialise views that don't rely on external data // core modules
		 */

		console.log('booting views...');
		this.attachTempClickHandler(); //temporary until its own module is created
	},

	attachTempClickHandler:function(){

		$('#sidebar a').on('click', function(e){
			e.preventDefault();

			var module = $(e.currentTarget).data('name');

			// call the method on the controller directly, not {trigger:true}
			// http://lostechies.com/derickbailey/2011/08/28/dont-execute-a-backbone-js-route-handler-from-your-code/
			// http://media.pragprog.com/titles/dsbackm/sample2.pdf

			switch(module) {

    			case 'playlists':
        			this.router.controller.showPlaylists();
					Backbone.history.navigate('playlists', {trigger: false})
        		break;

    			case 'queues':
        			this.router.controller.showQueues();
					Backbone.history.navigate('queues', {trigger: false})
        		break;
			}

		}.bind(this));

	},

	_showModule:function( module ){
		// debugger;
		this.layout.main.show( new this.viewModules[module]().show() );
		// this.router.navigate( module );

	},
	
	_fetchData: function(){

		/*
		 *	Deferred object to be resolved once data for Playlists and Queue has been loaded
		 */

		/*var deferred = $.Deferred();

		$.when(
			dataStore.playlistsCollection.fetch(),
			dataStore.queuesCollection.fetch()
		).then(function(){
			return deferred.resolve();
		});

		return deferred;*/

		//dont really need to be deferred anymore

		dataStore.playlistsCollection.fetch();
		dataStore.queuesCollection.fetch();
	},

});