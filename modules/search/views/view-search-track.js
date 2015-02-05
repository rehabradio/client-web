module.exports = Marionette.ItemView.extend({

	tagName: 'div',

    className: 'track',
    
	template: require('../templates/view-search-tracks.hbs'),

    events: {
    	'click .add-to-queue': '_onAddToQueue',
        'click .add-to-playlist': '_onAddToPlaylist'
	},

	_onAddToQueue: function(){

        this.trigger('search:queues:add');
    },

    _onAddToPlaylist: function(){


        this.trigger('search:playlists:add');

    	// console.log('this model', this.model);

     //    var urlRegex = /api\/playlists\/(.*)\/tracks\/(.*)\//,
     //        url = this.model.url();

     //    console.log(this.model.url());

     //    console.log( this.model.url().match(urlRegex));

     //    var data = {
     //        playlist: url.match(urlRegex)[1],
     //        track: this.model.get('track').id
     //    };

     //    dispatcher.trigger('search:onAddToPlaylist', data);
    },

    _onRemoveFromPlaylist: function(){
        this.trigger('playlists:tracks:remove', this.model);
    }
});