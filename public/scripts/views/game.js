define(function (require) {
  'use strict';
  var $ = require('jquery'),
      underscore = require('underscore'),
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
      // 1. make request to see if all players are ready => start the game
      // 2. start the game (the timer)
      console.log(e);
    },
  
    initialize: function () {
      'use strict';
    },
  
    render: function () {
      'use strict';
      debugger;
      var templ = this.template(this.model.toJSON());
      this.$el.html(templ);
      return this;
    }
  });

  return GameView;
});
