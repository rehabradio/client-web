/*
 *	Parent view for displaying all tracks within a playlist
 */
 
var TrackView = require('./view-playlist-track');

var EmptyView = require('./view-playlists-tracks-empty');

module.exports = Backbone.View.extend({
  
	template: require('../templates/view-playlists-tracks.hbs'),

	emptyTemplate: _.template('<span>No tracks</span>'),

	ChildView: TrackView,

	parentElement: '.tracks',

	initialize: function(){

		this.listenTo(this.collection, 'add', this._onAdd, this);
		this.listenTo(this.collection, 'remove', this._onRemove, this);
		this.listenTo(this.collection, 'reset', this._onReset, this);

		this.childViews = [];
	},

	_indexOf: function(view){
		var i = 0;
		for(; i < this.childViews.length; i++){
			if(this.childViews[i].cid === view.cid){
				break;
			}
		}

		return i;
	},

	_onAdd: function(model){

		var index = this.collection.indexOf(model);
		var view = new this.ChildView({model: model});

		var $parentElement = this.$el;

		if(this.parentElement){
			$parentElement = this.$el.find(this.parentElement).eq(0);
		}

		if(index === this.childViews.length){
			$parentElement.append(view.render().$el);
		}else{
			view.render().$el.insertBefore($parentElement.children().eq(index));
		}

		this.childViews.splice(index, 0, view);    

	},

	_onRemove: function(model){

		var view = _.find(this.childViews, function(view){ return view.model.cid === model.cid; });
		this.childViews.splice(this._indexOf(view), 1);

		view.trigger('this:remove');
	},

	_onReset: function(){
		console.log('onReset');
	},

	render: function(){

		this.$el.empty();
		this.$el.append(this.template(this.model.toJSON()));

		var $parentElement = this.$el;

		if(this.parentElement){
			$parentElement = this.$el.find(this.parentElement).eq(0);
		}

		this.childViews.forEach(function(view){
			$parentElement.append(view.render().$el);
		}.bind(this));
	}
});