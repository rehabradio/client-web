var BaseContoller   = require('../../core/controller/base-controller'),
    NavigationLayout  = require('../views/layout-navigation'),
    NavigationView  = require('../views/view-navigation');

module.exports = BaseContoller.extend({

    initialize: function(){

    	this.layout = new NavigationLayout({
    		regions: {
    			'navigation': 'nav'
    		}
    	});

        this.layout.navigation.show( new NavigationView() );

        // dispatcher.trigger(changeModule);
    }

});