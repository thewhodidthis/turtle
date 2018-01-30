'use strict';

var arithmetics = require('@thewhodidthis/arithmetics');
var poltocar = require('poltocar');

// # Taxi
// Teeny tiny turtle graphics helper

var createAgent = function (target) {
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

  taxi.mass = function (n) {
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

  taxi.turn = taxi.lt = function (angle) {
    if ( angle === void 0 ) angle = 0;

    data.angle += arithmetics.rad(angle);

    return taxi
  };

  taxi.move = taxi.fd = function (reach) {
    if ( reach === void 0 ) reach = 0;

    var next = poltocar(data.angle, reach);

    var x = data.x + next.x;
    var y = data.y - next.y;

    if (data.trace) {
      target.beginPath();
      target.moveTo(data.x, data.y);
      target.lineTo(x, y);
      target.stroke();
    }

    return taxi.goto(x, y)
  };

  taxi.rt = function (v) { return taxi.lt(-v); };
  taxi.bk = function (v) { return taxi.fd(-v); };

  return taxi
};

module.exports = createAgent;

