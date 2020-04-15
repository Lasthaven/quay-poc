var http = require('http');
var hostname = process.env.HOSTNAME || "Unknown"
var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hi! I\'m being served from ' + hostname);
};
var www = http.createServer(handleRequest);
www.listen(8080);
