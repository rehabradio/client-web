var ViewTrackItem = require('./view-queue-tracks-item');

module.exports = Marionette.CompositeView.extend({

	template: require('../templates/view-tracks.hbs'),

	childView: ViewTrackItem,

	childViewContainer: '.tracks',

	initialize: function(){

		this.listenTo(this, 'before:remove:child', this._triggerRemoveAnimation, this);
	},

	removeChildView: function(view) {

		if (view) {

			view.once('animation:remove:complete', function(){
				// call 'destroy' or 'remove', depending on which is found
				if (view.destroy) { view.destroy(); }
				else if (view.remove) { view.remove(); }

				delete view._parent;
				this.stopListening(view);
				this.children.remove(view);
				this.triggerMethod('remove:child', view);

				// decrement the index of views after this one
				this._updateIndices(view, false);
			}.bind(this))

			this.triggerMethod('before:remove:child', view);
		}

		return view;
	},

	_triggerRemoveAnimation: function(view){
		view.trigger('animation:remove');
	}
});