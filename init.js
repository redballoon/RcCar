var debug = true;
var http = require('http');

http.createServer(function (request, response) {
	if (debug) console.log('server: success', request, response);
	
	response.writeHeader(200, { 'Content-Type' : 'text/plain' });
	response.write('hello you');
	response.end();
}).listen(8080);