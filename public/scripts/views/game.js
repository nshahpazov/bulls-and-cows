define(function (require) {
  'use strict';

  var $ = require('jquery'),
      _ = require('underscore'),
      Backbone = require('backbone'),
      Handlebars = require('handlebars'),
      sourceTpl = require('text!templates/game.html'),
      template = Handlebars.compile(sourceTpl),
      wsocket = require('socket-connection');

  return Backbone.View.extend({

    tagName: 'div',

    id: 'game',

    template: template,

    events: {
      'click #ready-button': 'onClickReadyButton',
      'keyup #numberfield': 'onKeyup'
    },

    cevents: {
      'gameready': 'onGameReady',
      'gamefinished': 'onGameFinished',
      'allplayers': 'onAllPlayers',
      'gameresult': 'onGameResult'

    },

    initialize: function () {
      'use strict';
      wsocket.connect('ws://localhost:3000', this);
      var username = prompt('Enter your name');
      
      // for proper username ussage, just send a username
      wsocket.authenticate(username);
      this.ws = wsocket.ws;

      _.each(this.cevents, function (handler, ev) {
        this.listenTo(this, ev, this[handler]);
      }, this);
    },

    render: function () {
      'use strict';
      var templ = this.template(this.model.toJSON());
      this.$el.html(templ);
      return this;
    },
    
    // sends data with a status
    send: function (status, data) {
      this.ws.send(JSON.stringify(_.extend({
        status: status
      }, data)));
    },

    // Event handler catching when enter is typed on the input, so that result is sent 
    onKeyup: function (event) {
      if (event.keyCode == 13) {
        this.send('check', {
          number: $('#numberfield').val()
        });
      }
    },

    // Event handler for ready clicking
    onClickReadyButton: function () {
      'use strict';
      this.send('playerready');
    },

    // Huston, we've got a winner
    onGameFinished: function (data) {
      'use strict';
      alert('Winner is ' + data.winner);
      $('#numberfield').prop('disabled', true);
    },  

    // Some results for the current player are sent
    onGameResult: function (data) {
      console.log(data.result);
    },

    // Event Handler for when game is ready to be started
    onGameReady: function () {
      'use strict';
      $('#numberfield').prop('disabled', false);
    },
    
    // Event Handler for when players are updated
    // must be optimized to newplayer and playerready event
    onAllPlayers: function (data) {
      'use strict';
      this.model.set('players', data.players);
      this.render();
    }
  });
});
