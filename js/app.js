require('../modules/core/config/');

var ApplicationCore = require('../modules/core/');

$(function(){
    new ApplicationCore();
});

/*if(document.location.search.match(/debug/gi)){
	var tests = require('./jasmine/mocks.js');
}*/
