define(['backbone'], function (Backbone) {
  'use strict';
  var App = Backbone.View.extend({

    el: $('#content'),

    initialize: function () { 
    'use strict';
      console.log('Everything works out fine in th end');
    },

    events: {
      'click #start-game-button': 'onClickStartGame'
    },

    render: function () {
      'use strict';
    },

    onClickStartGame: function () {
      'use strict';
      console.log('game is started');
    }
  });
  return App;
});
