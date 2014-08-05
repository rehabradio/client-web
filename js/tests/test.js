playlists = require('./data/playlists');


var server = sinon.fakeServer.create();
window.xhr = sinon.useFakeXMLHttpRequest();
 
server.respondWith("GET", "http://rehabradio.vagrant.local:8000/api/playlists", [
    200, 
    {
    	"Content-Type": "application/json"
    }, 
    JSON.stringify(playlists)
]);

server.respondWith("GET", "http://rehabradio.vagrant.local:8000/api/queue", [
    200, 
    {
    	"Content-Type": "application/json"
    }, 
    JSON.stringify(playlists)
]);


$.ajax({
	method: 'GET',
	url: 'http://rehabradio.vagrant.local:8000/api/queue',
	success: function(data){
		console.log(data);
	}
});

server.respond();
 
// server.restore();