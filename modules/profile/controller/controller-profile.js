var LayoutProfile = require('../views/layout-profile'),
	ViewProfileInfo = require('../views/view-profile-info'),
	ViewProfileActivity = require('../views/view-profile-activity');

module.exports = Marionette.Controller.extend({

	initialize: function(){

		this.layout = new LayoutProfile({
			regions: {
				info: '#profile-info',
				activity: '#profile-activity'
			}
		});

		this.listenTo(this.layout, 'show', this.onShow);
	},

	show: function(){

		/*
		 *	Return profile layout view for rendering to DOM
		 */
		
		return this.layout;
	},

	onShow: function(){

		var viewProfileInfo = new ViewProfileInfo({model: dataStore.appModel});

		this.layout.info.show(viewProfileInfo);

		var viewProfileActivity = new ViewProfileActivity();
		this.layout.activity.show(viewProfileActivity);

	}
});