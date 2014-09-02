
module.exports = Marionette.LayoutView.extend({

	template: require('../templates/view-playlists.hbs'),

	className: 'module-playlists',

	initialize: function(options){
		this.regions = options.regions;
	},

	onRender:function(){


		var self = this;

		self.listenTo(dispatcher, 'playlist:tracks:show', self._onPlaylistTracksShow, self);

		self.listenTo(dispatcher, 'playlist:tracks:modal', self._onAddToPlaylist, self);

		self.listenTo(dispatcher, 'playlist:queue:modal', self._onAddToQueue, self);

		self.listenTo(dispatcher, 'playlist:show', self._onPlaylistShow, self);

	},

	_onPlaylistTracksShow: function(){

		this.$el.find('.left-column').addClass('contract');
	}
});