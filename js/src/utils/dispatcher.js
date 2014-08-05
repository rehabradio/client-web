Backbone = require('backbone');
$ = require('jquery');
_ = require('underscore');

Backbone.$ = $;

var Dispatcher = _.extend({}, Backbone.Events);

module.exports = Dispatcher;