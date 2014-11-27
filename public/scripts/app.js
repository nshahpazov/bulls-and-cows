define(function (require) {
  'use strict';
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var GameView = require('views/game');
  var GameModel = require('models/game');

  var App = Backbone.View.extend({

    el: $('#content'),

    initialize: function () { 
    'use strict';
    },

    events: {
      'click #start-game-button': 'onClickStartGame'
    },

    render: function () {
      'use strict';
    },

    onClickStartGame: function () {
      'use strict';
      var game = new GameModel(),
          gameView = new GameView({model: game});

      this.$el.html(gameView.render().$el);
    }
  });
  return App;
});
