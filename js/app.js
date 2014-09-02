require('./src/utils/config');

var Application = require('../modules/app/controller/controller-app');
//var Login = require('../modules/login/');

$(function(){
	new Application();
});