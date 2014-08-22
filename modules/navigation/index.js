var BaseContoller   = require('../core/controller/'),
    NavigationView  = require('./views/view-navigation');

module.exports = BaseContoller.extend({

    initialize: function(){

        this.layout.navigation.show( new NavigationView() );

        this.listenTo(dispatcher, 'router:controller', this.triggerController, this);

    }

});