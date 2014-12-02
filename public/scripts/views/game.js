define(function (require) {
  'use strict';

  var $ = require('jquery'),
      _ = require('underscore'),
      Backbone = require('backbone'),
      Handlebars = require('handlebars'),
      sourceTpl = require('text!templates/game.html'),
      template = Handlebars.compile(sourceTpl),
      wsocket = require('socket-connection'),

      lastValue;
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
      'use strict';
      this.ws.send(JSON.stringify(_.extend({
        status: status
      }, data)));
    },

    // Event handler catching when enter is typed on the input, so that result is sent 
    onKeyup: function (event) {
      var number = $('#numberfield').val();
      if (event.keyCode == 13 && this.model.get('ready')) {
        this.send('check', {
          number: number
        });
        lastValue = number;
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
      this.model.set('ready', false);
      alert('Winner is ' + data.winner);
    },  
    
    // Some results for the current player are sent
    onGameResult: function (data) {
      'use strict';
      this.updateFarm(data);
    },
    
    updateFarm: function (data) {
      'use strict';
      var res = data.result;
      this.model.set('bulls', _.range(0, res.bulls));
      this.model.set('cows', _.range(0, res.cows));
      this.render();
      $('#numberfield').val(lastValue);
      $('#numberfield').focus();
    },

    // Event Handler for when game is ready to be started
    onGameReady: function () {
      this.model.set('ready', true);
      // $('#ready-button').hide();
      $('#numberfield').focus();
      'use strict';
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
