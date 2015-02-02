module.exports = Marionette.ItemView.extend({

	className: 'queue',

	template: require('../templates/view-queues-item.hbs'),

	events: {
		'click #queue-view': '_loadSelectedQueue'
	},

	initialize: function(){

		var self = this;

		// self.listenTo(self.model, 'change', this.render, this);

		this._setCoverArt();
// 

		this.listenTo(dispatcher, 'socket:queue:update', this._setCoverArt, this);
		self.listenTo(self.model, 'change:coverart', self._onCoverartChange);

	},


	_setCoverArt: function(){
		if(this.model.get('coverart').length < 4){
			$.ajax({
				url: window.API_ROOT + 'queues/' + this.model.get('id') + '/tracks/',
				type: 'GET',
				success: function(data){

					var count = Math.min(data.count, 4),
						coverart = [];

					for(var i = 0; i < count; i++){

						if(!!data.results[i]){

							/*
							 *	If the track doesn't have a thumbnail then it is skipped
							 */

							if(!!data.results[i].track.image_small){

								coverart.push({url: data.results[i].track.image_small});
							}else{

								count++;
							}
						}
					}

					this.model.set('coverart', coverart);
				}.bind(this)
			});
		}
	},

	_onCoverartChange: function(){
		
		var self = this,
			$coverart = self.$el.find('#queue-view .cover-art');

		$coverart.empty();

		_.each(this.model.get('coverart'), function(element){
			$coverart.append('<img src="' + element.url + '" alt="">');
		});
		
	},

	_loadSelectedQueue: function(){

		this.trigger('queues:show', this.model.get('id'));

	}
});