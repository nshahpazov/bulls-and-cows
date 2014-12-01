var _ = require('lodash');

function BullsAndCows(str) {
  'use strict';
  this.number = str;
}

BullsAndCows.generate = function (n) {
  'use strict';
  var result = [];
  while (n) {
    var rand = 1 + Math.round(Math.random() * 8);
    if (result.indexOf(rand) === -1) {
      result.push(rand);
      n--;
    }
  }
  console.log(result.join(''));
  return result.join('');
};

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
