module.exports = {
	showProfile:function(){
		dispatcher.trigger('router:showModule', 'profile');
	},
};