var PlaylistView = require('./view-playlist'),
	EmptyView = require('./view-playlists-empty');

module.exports = Marionette.CompositeView.extend({

	childView: PlaylistView,

	emptyView: EmptyView,

	childViewContainer: '.playlists',

	_onPlaylistRemove: function(playlist){
		this.collection.remove(playlist);
	},

	removeChildView: function(view) {
		// Overrides built in Marionette function

		if (view) {

			view.el.classList.add('animation-remove');

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