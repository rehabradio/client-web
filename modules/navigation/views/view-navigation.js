module.exports = Marionette.ItemView.extend({
	
	template: require('../templates/navigation.hbs'),

	ui:{
        link: 'a',
    },

    events:{
        'click @ui.link' : 'stateUpdate'
    },

    stateUpdate:function(e){

        //step 1

        e.preventDefault();
        var module = $(e.currentTarget).data('name');
        dispatcher.trigger('router:controller', module);
    }
});