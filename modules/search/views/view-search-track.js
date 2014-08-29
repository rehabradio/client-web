module.exports = Marionette.ItemView.extend({

	tagName: 'li',
	template: require('../templates/view-search-tracks.hbs'),

    events: {
    	'click .add-to-queue': '_onAddToQueue',
        'click .add-to-playlist': '_onAddToPlaylist'
	},

	_onAddToQueue: function(e){
		dispatcher.trigger('search:onAddToQueue', this.model);
    },

    _onAddToPlaylist: function(){

        var urlRegex = /api\/playlists\/(.*)\/tracks\/(.*)\//,
            url = this.model.url();

        var data = {
            playlist: url.match(urlRegex)[1],
            track: this.model.get('track').id
        }

        this.trigger('playlists:tracks:modal', data);
    },

    _onRemoveFromPlaylist: function(){
        this.trigger('playlists:tracks:remove', this.model);
    }
});