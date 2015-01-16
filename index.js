var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'base', extname: 'html'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname));

app.get('*', function(req, res){

	res.render('index');

});

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
	console.log('listening on port: ', port);
});