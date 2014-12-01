define(function (require) {
  'use strict';
  return {
    connect: function (url, view) {
      'use strict';
      this.ws = new WebSocket(url);

      this.ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        view.trigger(data.status, data);
      };
    },

    authenticate: function (username) {
      'use strict';
      this.ws.send(JSON.stringify({
        status: 'authenticate',
        username: username
      }));
    }
  };
});
