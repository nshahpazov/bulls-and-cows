
function BullsAndCows(str) {
  'use strict';
  this.number = str;
}

BullsAndCows.prototype.bully = function (number) {
  'use strict';
  // try with a regex later
  var result = {
    bulls: 0,
    cows: 0
  };

  var matches = [].forEach.call(number, (function (n, i) {
    if (this.number.indexOf(n) === i) {
      result.bulls++;
    } else if (this.number.indexOf(n) !== -1) {
      result.cows++;
    }
  }).bind(this));
  return result;
};

module.exports = BullsAndCows;
