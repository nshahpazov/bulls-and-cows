define(function (require) {
  'use strict';

  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      players: [],
      ready: false,
      minutes: 0,
      seconds: 0,
      cows: [],
      bulls: []
    }
  });
});
