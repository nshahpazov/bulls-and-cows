var _ = require('lodash');
var BullsAndCows = require('./bulls-and-cows');

// it's initialized when the game is ready
var game;

module.exports = function (wss, ws) {
  'use strict';

  function sendAll(status, data) {
    'use strict';
    wss.clients.forEach(function (client) {
      client.send(JSON.stringify(_.extend({
        status: status
      }, data)));
    });
  }

  return {
    events: {
      check: 'onCheck',
      playerready: 'onPlayerReady',
      authenticate: 'onAuthenticate'
    },

    handlers: {

      // Event Handlers for particular messages
      onCheck: function (data) {
        'use strict';
        var result = game.bully(data.number);
        ws.send(JSON.stringify({
          status: 'gameresult',
          result: result
        }));

        if (result.bulls === 4) {
          sendAll('gamefinished', {
            winner: ws.username
          });
        } 
      },
      
      // When a particular player is ready
      onPlayerReady: function () {
        'use strict';
        ws.ready = true;
        var players = wss.clients.map(function (client) {
          return _.pick(client, 'username', 'ready');
        });

        var count = _.pluck(players, 'ready')
                     .filter(Boolean).length;

        sendAll('allplayers', {
          players: players
        });

        if (count === wss.clients.length) {
          game = new BullsAndCows(BullsAndCows.generate(4));
          sendAll('gameready');
        }
      },

      onAuthenticate: function (data) {
        'use strict';
        console.log('here');
        ws.username = data.username;
        sendAll('allplayers', {
           status: 'allplayers',                         
           players: wss.clients.map(function (client) {
             return _.pick(client, 'username', 'ready');
           })
        });
      }
    }
  };
};
