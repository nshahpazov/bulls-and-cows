function WSController(wss, ws, control) {
  'use strict';
  this.wss = wss;
  this.ws = ws;
}

WSController.prototype.initialize = function (control) {  
  'use strict';
  var that = this;
  this.ws.on('message', function (response) {
    var data = JSON.parse(response);
    Object.keys(control.events).forEach(function (ev) {
      if (ev === data.status) {
        control.handlers[control.events[ev]](data);
      }
    });
  });
};
module.exports = WSController;
