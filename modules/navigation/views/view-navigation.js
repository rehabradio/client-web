module.exports = Marionette.ItemView.extend({
	
	template: require('../templates/navigation.hbs'),

    tagName: 'ul',

	ui:{
        link: 'a',
    },

    events:{
        'click @ui.link' : 'stateUpdate'
    },

    stateUpdate:function(e){
        e.preventDefault();
        var module = $(e.currentTarget).data('name');
        dispatcher.trigger('navigation:changemodule', module);
    }
});