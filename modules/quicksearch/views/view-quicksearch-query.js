module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-quicksearch-query.hbs'),

	events: {
		'keyup .search-field': '_onKeyup',
		'focus .search-field': '_onFocus'
	},

	initialize: function(){
		this.timer = null;

	},

	_onFocus: function(){
		this.timer = setTimeout(this._doSearch.bind(this), 500);
		this.trigger('quicksearch:setactive');
	},

	_onKeyup: function(){
	    clearTimeout(this.timer);
	    this.timer = setTimeout(this._doSearch.bind(this), 500);
	},

	_doSearch: function(){

		var query = this.el.querySelector('.search-field').value;

		if(query.length > 1){
			this.trigger('quicksearch:search', query);
		}
	}
});