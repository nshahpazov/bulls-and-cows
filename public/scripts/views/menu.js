define(['backbone', 'jquery'], function (Backbone, $) {
  'use strict';
  var MenuView = Backbone.View.extend({
    
    el: $('#menu'),

    initialize: function () {
      'use strict';
      console.log('init of menu-view');
    }  
  });

  return MenuView;
});
