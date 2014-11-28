var WebSocketServer = require('ws').Server;
var BullsAndCows = require('./bulls-and-cows');
var _ = require('lodash');
var wss = new WebSocketServer({
  port: 3000,
  host: '0.0.0.0'
});

var game;

console.log('Server Started on port 3000');

wss.on('connection', function connection(ws) {
  console.log('someone connected to the server');
  ws.on('message', function incomming(message) {
    var msg = JSON.parse(message);
    if (msg.ready) {
      ws.ready = true;
    }
    debugger;
    var count = _.pluck(wss.clients, 'ready')
          .filter(Boolean).length;
    
    // move it in a separate function - start-game or whatever
    if (count === wss.clients.length) {
      
      // fix the bug with lesser than 1000 numbers
      var rand = Math.round(Math.random() * 10000).toString();
      game = new BullsAndCows(rand); 
      var msg = JSON.stringify({
        status: 'gameready'
      });
      wss.clients.forEach(function (client) {
        
        client.send(msg);
      });
    }
    if (message.status === 'ready') {
    }
    // calculate the result
    // send score back
    // if end send end result
  });
});
