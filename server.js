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
    // send just a player ready
    if (msg.status === 'try') {
      var result = game.bully(msg.number);
      if (result.bulls === 4) {
        wss.clients.forEach(function (cl) {
          cl.send(JSON.stringify({
            status: 'gamefinished',
            winner: ws.username
          }));
        });
      } else {
        ws.send(JSON.stringify({
          status: 'gameresult',
          result: result
        }));
      }
      return;
    }

    if (msg.status === 'playerready') {
      ws.ready = true;
      wss.clients.forEach(function (cl) {
        cl.send(JSON.stringify({
          status: 'allplayers',
          players: wss.clients.map(function (client) {
            return _.pick(client, 'username', 'ready');
          })
        }));
      });
      
       var count = _.pluck(wss.clients, 'ready')
                    .filter(Boolean).length; 
       if (count === wss.clients.length) { 

         game = new BullsAndCows(BullsAndCows.generate(4)); 
         var msg = JSON.stringify({
           status: 'gameready'
         });
         wss.clients.forEach(function (client) {
           
           client.send(msg);
         });
       }
    }
    if (msg.status === 'authenticate') {
      console.log(msg);
      ws.username = msg.username;
      
      // do not send it to th
      wss.clients.forEach(function (cl) {
        cl.send(JSON.stringify({
          status: 'allplayers',
          players: wss.clients.map(function (client) {
            return _.pick(client, 'username', 'ready');
          })
        }));
      });
    }
  });
});
