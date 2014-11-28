(function (window) {
  'use strict';
  var mins,
      secs;

  function Counter(dom, options) {
    'use strict';
    this.dom = dom;
    this.options = options;
  }
  
  function toString() {
    'use strict';
    var minsStr = mins < 10 ? '0'.concat(mins) : mins,
        secsStr = secs < 10 ? '0'.concat(secs) : secs; 
    return minsStr + ':' + secsStr;
  }

  Counter.prototype.start = function () {
    'use strict';
    var that = this;
    setInterval(function () {
      if (secs === 59) {
        secs = 0;
        mins++;
      }
      that.dom.innerHTML = that.toString();
    }, 1000);
  };

  Counter.prototype.reset = function () {
    'use strict';
    mins = secs = 0;
    clearInterval();
  };

  window.Counter = Counter;
})(window);
