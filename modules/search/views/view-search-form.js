var Model = Backbone.Model.extend({
	defaults: {
		query: ''
	}
});

module.exports = Marionette.ItemView.extend({

	tagName: 'form',

	template: require('../templates/template-search-input.hbs'),

	events: {
		'submit': '_onSubmit',
		'keypress input': '_onQueryChange',
		'keyup input': '_onKeyUp',
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

        this.el.querySelector('.query').focus();

	},

	_onSubmit: function(e){
		e.preventDefault();
	},

	timer: null,
	
	_onQueryChange: function(e){
		
		var self = this,
			s = String.fromCharCode(e.keyCode),
			regex = /[a-zA-Z0-9!@£$%^&*()]/;

		if(regex.test(s)){

			// e.currentTarget.addEventListener('keyup', this._onSetQuery.bind(this), false);

			e.currentTarget.addEventListener('keyup', function onKeyUp(){

				this.removeEventListener('keyup', onKeyUp, true);

				if(self.timer){
					clearTimeout(self.timer);
				}

				self.timer = setTimeout(self._triggerSearch.bind(self), 500);

				self.model.set('query', e.currentTarget.value);
			}, true);
		}
	},

	_onKeyUp: function(e){

		if(e.keyCode === 8){

			if(this.timer){
				clearTimeout(this.timer);
			}

			this.timer = setTimeout(this._triggerSearch.bind(this), 500);

			this.model.set('query', e.currentTarget.value);
		}
	},

	_triggerSearch: function(){

		history.pushState(null, null, '?query=' + encodeURIComponent(this.model.get('query')));
		this.trigger('search:search', this.model.get('query'));
	}
});