var Marionette = require('backbone.marionette');

var SearchRegion = Marionette.Region.extend({

	initialize: function(){
        console.log('new override region');
    }
});

module.exports = SearchRegion;