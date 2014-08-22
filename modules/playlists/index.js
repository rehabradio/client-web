var BaseContoller = require('../core/controller/'),
    View = require('./views/view-playlists-layout');

module.exports = BaseContoller.extend({

    initialize: function(){

        this.layout.main.show(new View() );

        this.listenTo(dispatcher, 'playlists:show', this.router.controller.showPlaylists);
        this.listenTo(dispatcher, 'playlist:show', this.router.controller.showPlaylist, this);
    }
});