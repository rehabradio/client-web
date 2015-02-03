var LoginView = require('../views/view-login');

// #################################################
// #                                               #
// #                                               #
// #    Note: Sign-out doesn't work on localhost   #
// #                                               #
// #                                               #
// #################################################

module.exports = Marionette.Controller.extend({
    initialize: function(){

        this.view = new LoginView();  
        
    },

    show: function(){
      return this.view;
    }
    
});