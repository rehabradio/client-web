module.exports = Marionette.ItemView.extend({

    id: 'google-login',
    
    template: require('../templates/login.hbs'),

    events: {
        'click #log-in': '_onSignIn'
    },

    _onSignIn: function(){
        this.trigger('gapi:auth:signIn');
    }
});