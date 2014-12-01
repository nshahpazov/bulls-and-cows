define(function (require) {
  'use strict';

  var $ = require('jquery'),
    countup = require('utils/countup'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    sourceTpl = require('text!templates/game.html'),
    template = Handlebars.compile(sourceTpl),
    wsocket = require('socket-connection');

  var GameView = Backbone.View.extend({

    tagName: 'div',
    className: "col-md-8 col-md-offset-4",

    id: 'game',

    template: template,

    events: {
      'click #ready-button': 'onClickReadyButton',
      'keyup #numberfield': 'onKeyup'
    },

    onKeyup: function (event) {
      var value = event.target.value;
      if (event.keyCode == 13) {
        this.ws.send(JSON.stringify({
          status: 'try',
          number: value.toString()
        }));
      }
    },

    onClickReadyButton: function (e) {
      'use strict';
      this.ws.send(JSON.stringify({
        status: 'playerready'
      }));
    },

    startGame: function () {
      'use strict';
      var timerDOM = $('#timer');
      timerDOM.countup(function (d, h, m, s) {
        timerDOM.html(m + ':' + s);
      });
    },

    initialize: function () {
      'use strict';
      wsocket.connect('ws://localhost:3000', this);
      var username = prompt('Enter your name');

      wsocket.authenticate(username);
      this.ws = wsocket.ws;

      this.listenTo(this, 'gameready', this.onGameReady);
      this.listenTo(this, 'gamefinished', this.onGameFinished);
      this.listenTo(this, 'allplayers', this.onAllPlayers);
      this.listenTo(this, 'gameresult', this.onGameResult);
    },

    onGameResult: function (data) {
      console.log(data.result);
    },

    onGameReady: function () {
      'use strict';
      $('#numberfield').prop('disabled', false);
      this.startGame();
    },

    onAllPlayers: function (data) {
      this.model.set('players', data.players);
      this.render();
    },

    render: function () {
      'use strict';
      var templ = this.template(this.model.toJSON());
      this.$el.html(templ);
      return this;
    }
  });

  return GameView;
});
