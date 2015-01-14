var Model = Backbone.Model.extend({
	defaults: {
		query: ''
	}
});

module.exports = Marionette.ItemView.extend({

	tagName: 'form',

	template: require('../templates/template-search-input.hbs'),

	events: {
		'keyup input': '_onQueryChange'
	},

	model: new Model(),

	initialize: function(){
	},


	onShow: function(){

        var searchParams = location.search.replace('?', '').split('&'),
            params = {};

        for(var i in searchParams){
            params[searchParams[i].split('=')[0]] = searchParams[i].split('=')[1];
        }

        if(params.query){
            this.el.querySelector('input').value = decodeURIComponent(params.query);;
        }

	},

	timer: null,
	
	_onQueryChange: function(e){

		if(this.timer){
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(this._triggerSearch.bind(this), 500);

		this.model.set('query', e.currentTarget.value);

		// console.log(e.currentTarget.value);
	},

	_triggerSearch: function(){
		history.pushState(null, null, '?query=' + this.model.get('query'));
		this.trigger('search:search', this.model.get('query'));
	}
});