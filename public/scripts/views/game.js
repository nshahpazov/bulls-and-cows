define(function (require) {
  'use strict';
  
  var $ = require('jquery'),
      underscore = require('underscore'),
      countup = require('utils/countup'),
      Backbone = require('backbone'),
      Handlebars = require('handlebars'),
      sourceTpl = require('text!templates/game.html'),
      template = Handlebars.compile(sourceTpl);

  var GameView = Backbone.View.extend({

    tagName: 'div',
    className: "col-md-8 col-md-offset-4",
    
    id: 'game',

    template: template,

    events: {
      'click #ready-btn': 'onClickReadyButton'        
    },

    onClickReadyButton: function (e) {
      'use strict';
      this.ws.send(JSON.stringify({ready: true}));
      // make the button inactive
    },

    startGame: function () {
      'use strict';
     var timerDOM = $('#timer');

     // definitely optimize this shit later!!!
     timerDOM.countup(function (d, h, m, s) {
       timerDOM.html(m + ':' + s);
     });
    },
    
    // refactor!
    initialize: function () {
      'use strict';
      this.ws = new WebSocket('ws://localhost:3000');
      var that = this;

      this.ws.onmessage = function (e) {
        var res = JSON.parse(e.data);
        
        // create some controller for that
        if (res.status === 'gameready') {
          that.trigger('gameready');
        } else {
          if (res.status === 'gamefinished') {
            that.trigger('gamefinished');
          }
        }
      };
      
      this.listenTo(this, 'gameready', function () {
        // it can be bound
        that.startGame();
      });
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
