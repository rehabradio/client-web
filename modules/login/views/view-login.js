module.exports = Marionette.ItemView.extend({

    id: 'google-login',

    className: 'login',
    
    template: require('../templates/login.hbs'),

    events: {
        'click #log-in': '_onSignIn'
    },

    _onSignIn: function(){
    	dispatcher.trigger('auth:signin');
    }
});