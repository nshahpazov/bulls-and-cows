define (['jquery'], function ($) {

  var days  = 24*60*60,
      hours = 60*60,
      minutes = 60;


$.fn.countup = function (cb, prop) {

  var options = $.extend({
    callback: cb || function () {},
    start: new Date() // Changing this to "start"
  }, prop);

  // Tename the "left" variable to "passed"
  var passed = 0,
    d, h, m, s,
    positions;

  // init(this, options);

  positions = this.find('.position');

  (function tick() {

    // Calculate the passed time
    passed = Math.floor((new Date() - options.start) / 1000);

    // Calculate the passed minutes, hours and days   

    d = Math.floor(passed / days);
    updateDuo(0, 1, d);
    passed -= d * days;

    h = Math.floor(passed / hours);
    updateDuo(2, 3, h);
    passed -= h * hours;

    m = Math.floor(passed / minutes);
    updateDuo(4, 5, m);
    passed -= m * minutes;

    // Number of seconds passed
    s = passed;
    updateDuo(6, 7, s);

    options.callback(d, h, m, s);

    setTimeout(tick, 1000);
  })();

  // This function updates two digit positions at once
  function updateDuo(minor, major, value) {
    //switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
    //switchDigit(positions.eq(major), value % 10);
  }
  return this;
};
});
