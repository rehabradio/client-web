var modelApp 	= require('./models/models-app'),
	ViewUser 	= require('./views/view-user'),
	AppLayout 	= require('./layout/layout'),
	AppRouter 	= require('./router/router');


var App = Marionette.Controller.extend({

	model: modelApp,

	// core modules are started as soon as the app loads.
	coreModules: {
		search: require('../search/'),
		navigation: require('../navigation/')
	},

	// called by routers controller.
	// these need switched to boot up module controllers first, and not views
	viewModules: {
		queue: require('../queues/'),
		playlist: require('../playlists/')
	},

	initialize:function(){

		this.appModules = _.extend(this.coreModules, this.viewModules);
		this.router = new AppRouter();	
		Backbone.history.start({ pushState: true, root: '/' });

		this.layout = new AppLayout();
		this.layout.render();

		this.viewUser = new ViewUser();

		this.setUpListeners();
	},

	setUpListeners:function(){
		this.listenTo(this.model, 'change:loginStatus', this.changeLoginStatus, this);
		this.listenTo(dispatcher, 'login-set-status', this.setLoginStatus, this);
		this.listenTo(dispatcher, 'router:showModule', this._showModule, this);
	},

	changeLoginStatus:function(model){
		if( model.get('loginStatus') ) this._startApp();
	},

	_startApp:function(){
		this.fetchColletions();
		dataStore.appModel = modelApp;

		this.initiateModules( this.appModules );
	},

	fetchColletions:function(){
		dataStore.playlistsCollection.fetch();
		dataStore.queuesCollection.fetch();
	},

	initiateModules:function( modules ){
		for( var module in modules ){
			new modules[ module ]( this );
		}
	},

	/*_showModule:function( module, routeOptions ){

		console.log(module, routeOptions);

		this.layout.main.show( new this.viewModules[module]() );
		this.router.navigate( routeOptions.path );

	},*/

	setLoginStatus: function(status, user){

		if(!!user){
			this.setUpUser(user); //abstract to app core?
		}

		this.model.set('loginStatus', status); // Triggers the rerender;
	},

	setUpUser:function( user ){
		this.model.set('url', user.url);
		this.model.set('displayName', user.displayName);
		this.model.set('image', user.image.url);
	}
});

module.exports = App;