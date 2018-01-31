'use strict';

var arithmetics = require('@thewhodidthis/arithmetics');
var pol2car = require('poltocar');

// # Taxi
// Teeny tiny turtle graphics helper

var createTaxi = function (target) {
  var pass = target instanceof CanvasRenderingContext2D;

  if (!pass) {
    throw Error('Invalid rendering context')
  }

  var data = { x: 0, y: 0, angle: 0, trace: true };
  var taxi = {
    get data() {
      return Object.assign({}, data, { angle: arithmetics.deg(data.angle) })
    }
  };

  taxi.skin = function (s) {
    target.strokeStyle = s;

    return taxi
  };

  taxi.hint = function (n) {
    target.lineWidth = n;

    return taxi
  };

  taxi.goto = function (x, y) {
    data.x = x || data.x;
    data.y = y || data.y;

    return taxi
  };

  taxi.mask = taxi.pu = function () {
    data.trace = false;

    return taxi
  };

  taxi.tail = taxi.pd = function () {
    data.trace = true;

    return taxi
  };

  taxi.turn = taxi.lt = function (a) {
    if ( a === void 0 ) a = 0;

    data.angle += arithmetics.rad(a);

    return taxi
  };

  taxi.move = taxi.fd = function (r, more) {
    if ( more === void 0 ) more = function (v) { return v; };

    var next = pol2car(data.angle, r || 0);

    var x = data.x + next.x;
    var y = data.y - next.y;

    if (data.trace) {
      target.beginPath();
      target.moveTo(data.x, data.y);
      target.lineTo(x, y);
      target.stroke();
    }

    more({ x: x, y: y });

    return taxi.goto(x, y)
  };

  taxi.rt = function (v) { return taxi.lt(-v); };
  taxi.bk = function (v) { return taxi.fd(-v); };

  return taxi
};

module.exports = createTaxi;

