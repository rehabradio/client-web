/**
* Marionette Item View for the Quicksearch input field
*
* @class ViewQuicksearchQuery
* @extends LayoutQuicksearch
* @contructor
*/

module.exports = Marionette.ItemView.extend({

	template: require('../templates/view-quicksearch-query.hbs'),

	events: {
		'keyup .search-field': '_onKeyup',
		'focus .search-field': '_onFocus'
	},

	initialize: function(){
		this.timer = null;

	},
	/**
	 * Activtes the setTimeout.
	 *
	 * @function _onFocus
	 * @memberOf ViewQuicksearchQuery
	 */
	_onFocus: function(){
		this.timer = setTimeout(this._doSearch.bind(this), 500);
		this.trigger('quicksearch:setactive');
	},
	/**
	 * Resets the setTimeout
	 *
	 * @function _onKeyup
	 * @memberOf ViewQuicksearchQuery
	 */
	_onKeyup: function(){
	    clearTimeout(this.timer);
	    this.timer = setTimeout(this._doSearch.bind(this), 500);
	},
	/**
	 * Called when the set timeout ends, triggering the 'quicksearch:search' event in the controller.
	 *
	 * @function _doSearch
	 * @memberOf ViewQuicksearchQuery
	 * @fires quicksearch#search
	 */
	_doSearch: function(){

		var query = this.el.querySelector('.search-field').value;

		if(query.length > 1){
			this.trigger('quicksearch:search', query);
		}
	}
});