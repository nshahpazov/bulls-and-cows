var WebSocketServer = require('ws');

var wss = new WebSocketServer({
  port: 3000,
  host: '0.0.0.0'
});

console.log('Server Started on port 3000');

wss.on('connection', function connection(ws) {
  console.log('someone connected to the server');

  ws.on('message', function incomming(message) {
    console.log(message);
    // calculate the result
    // send score back
    // if end send end result
  });
});
