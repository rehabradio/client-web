var fs = require('fs');
var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'base', extname: 'html'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname));

app.get('*', function(req, res){

	/*
	 *	Loads in the icon svg and places it in the template inline
	 */

	fs.readFile('./img/icons.svg', 'utf8', function(err, data){

		res.render('index', {svg: data});
	});
});

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
	console.log('listening on port: ', port);
});