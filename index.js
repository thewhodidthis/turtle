'use strict';

var arithmetics = require('@thewhodidthis/arithmetics');
var pol2car = require('poltocar');

// # Taxi
// Teeny tiny turtle graphics agent

var createTaxi = function (target, handler) {
  if ( target === void 0 ) target = {};

  if (!('canvas' in target)) {
    throw Error('Invalid rendering context')
  }

  var draw = typeof handler === 'function' ? handler : function (sx, sy, dx, dy) {
    target.beginPath();
    target.moveTo(sx, sy);
    target.lineTo(dx, dy);
    target.stroke();
  };

  var data = { x: 0, y: 0, angle: 0, trace: true };
  var taxi = {
    get data() {
      return Object.assign({}, data, { angle: arithmetics.deg(data.angle) })
    }
  };

  taxi.goto = function (x, y) {
    if ( x === void 0 ) x = data.x;
    if ( y === void 0 ) y = data.y;

    data.x = x;
    data.y = y;

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

  taxi.move = taxi.fd = function (r) {
    var step = pol2car(data.angle, r || 0);

    var x = data.x + step.x;
    var y = data.y - step.y;

    if (data.trace) {
      draw(data.x, data.y, x, y);
    }

    return taxi.goto(x, y)
  };

  taxi.rt = function (v) { return taxi.lt(-v); };
  taxi.bk = function (v) { return taxi.fd(-v); };

  return taxi
};

module.exports = createTaxi;

