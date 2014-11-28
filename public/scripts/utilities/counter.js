define(function () {
  'use strict';
  var mins = 0,
      secs = 0;

  function Counter(dom, options) {
    'use strict';
    this.dom = dom;
    this.options = options;

    dom.innerHTML = this.toString();
  }
  
  Counter.prototype.toString = function () {
    'use strict';
    var minsStr = mins < 10 ? '0'.concat(mins) : mins,
        secsStr = secs < 10 ? '0'.concat(secs) : secs; 
    return minsStr + ':' + secsStr;
  }

  function incrementTime() {
    'use strict';
    if (secs === 59) {
      secs = 0;
      mins++;
    } else {
      secs++;
    }
  }

  Counter.prototype.start = function () {
    'use strict';
    var that = this;
    var i = 0;
    setInterval(function () {
      incrementTime();
      console.log(i++);
      that.dom.innerHTML = secs;// that.toString();
    }, 1000);
  };

  Counter.prototype.reset = function () {
    'use strict';
    mins = secs = 0;
    clearInterval();
  };
  
  return Counter;

});
