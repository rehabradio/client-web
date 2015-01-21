module.exports = Marionette.ItemView.extend({
	
	template: require('../templates/navigation.hbs'),

    tagName: 'ul',

	ui:{
        link: 'button'
    },

    events:{
        'click @ui.link' : '_onModuleChange'
    },

    initialize: function(){
        this.listenTo(dispatcher, 'navigation:ui:update', this._onNavigationUiUpdate, this);
    },

    _stripActiveClass: function(){

        var buttons = this.el.querySelectorAll('button');

        for(var i = 0; i < buttons.length; i++){
            buttons[i].classList.remove('active');
        }
    },

    _onNavigationUiUpdate: function(module){

        this._stripActiveClass();

        switch(module){

            case 'queues':
                this.el.querySelector('.queues').classList.add('active');
                break;

            case 'playlists':
                this.el.querySelector('.playlists').classList.add('active');
                break;

            case 'profile':
                this.el.querySelector('.profile').classList.add('active');
                break;

            case 'search':
                this.el.querySelector('.search').classList.add('active');
                break;
        }
    },

    _onModuleChange:function(e){
        e.preventDefault();

        this._stripActiveClass();
        e.currentTarget.classList.add('active');

        var module = $(e.currentTarget).data('name');
        dispatcher.trigger('navigation:changemodule', module);
    }
});