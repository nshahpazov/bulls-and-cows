define(function (require) {
  'use strict';
  var Backbone = require('backbone');
  
  return Backbone.Model.extend({
    defaults: {
      players: ['Nikola Shahpazov'],
      isStarted: false,
      minutes: 0,
      seconds: 0,
      cows: 0,
      bulls: 0
    }
  });
});
