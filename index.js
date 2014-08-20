var express = require('express');

var app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res){

	res.sendFile(__dirname + '/index.html');
});

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
	console.log('listening on port: ', port);
});