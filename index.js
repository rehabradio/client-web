var express = require('express');
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');

var app = express();

app.use(express.static(__dirname));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GooglePlusStrategy({
	clientId: '263513175105-o8beutglcacde1pv5k6k6hnq0d0g1v53.apps.googleusercontent.com',
	clientSecret: 'hwu8kYU0RmlS3ArrLKN2Xh6-'
}, function(tokens, profile, done){
	done(null, profile, tokens);
}))


app.post('/login', passport.authenticate('google'), function(req, res) {
    // Return user back to client
    res.send(req.user);
});

app.get('/', function(req, res){

	res.sendFile(__dirname + '/index.html');
});

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
	console.log('listening on port: ', port);
});