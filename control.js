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
        var result = game.bully(data.number);

        if (result.bulls === 4) {
          sendAll('gamefinished', {
            winner: ws.username
          });
        } else {
          ws.send(JSON.stringify({
            status: 'gameresult',
            result: result
          }));
        }
      },

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
        ws.username = data.username;
        sendAll({
           status: 'allplayers',                         
           players: wss.clients.map(function (client) {
             return _.pick(client, 'username', 'ready');
           })
        });     
      }
    }
  };
};
