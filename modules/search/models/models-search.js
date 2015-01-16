module.exports = Backbone.Model.extend({

	initialize: function(){

		this.listenTo(this, 'add', function(){
			var details = this.get('name');

			if(this.get('artists')){
				details += (' - ' + this.get('artists')[0].name);
			}

			if(this.get('album')){
				details += (' - ' + this.get('album').name);
			}

			if(details.length > 60){
				details = details.substring(60, 0);
				details += "…";
			}

			this.set('details', details);

		}, this);
	}
});