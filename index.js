'use strict';

var arithmetics = require('@thewhodidthis/arithmetics');
var poltocar = require('poltocar');

// # Turtle
// Graphics do

var createTurtle = function (turf, load) {
  if ( load === void 0 ) load = {};

  var pass = turf instanceof CanvasRenderingContext2D;

  if (!pass) {
    throw Error('Invalid rendering context')
  }

  var ref = turf.canvas;
  var w = ref.width;
  var h = ref.height;

  var home = Object.assign({ x: w * 0.5, y: h * 0.5, angle: 0 }, load);
  var data = Object.assign({ trace: 1 }, home);

  var path = [];

  // This turtle goes by the name of Jack :))
  var jack = {
    get venue() {
      return { x: data.x, y: data.y }
    },
    get angle() {
      return arithmetics.deg(data.angle)
    },
    get score() {
      return path
    },
    get state() {
      return data
    }
  };

  jack.look = function (style, width) {
    if ( style === void 0 ) style = turf.strokeStyle;
    if ( width === void 0 ) width = turf.lineWidth;

    turf.strokeStyle = style;
    turf.lineWidth = width;

    return jack
  };

  jack.fill = function (style) {
    if (style) {
      turf.fillStyle = style;
    }

    turf.beginPath();

    if (path.length) {
      path.forEach(function (p) {
        turf.lineTo(p.x, p.y);
      });
    } else {
      turf.rect(0, 0, w, h);
    }

    turf.fill();

    return jack
  };

  jack.wipe = function () {
    turf.clearRect(0, 0, w, h);

    path.length = 0;

    return jack
  };

  jack.home = function () { return jack.goto(home.x, home.y); };
  jack.goto = function (x, y) {
    data.x = x || data.x;
    data.y = y || data.y;

    return jack
  };

  jack.down = jack.up = function () {
    data.trace = !data.trace;

    return jack
  };

  jack.turn = jack.lt = function (angle) {
    data.angle += arithmetics.rad(angle);

    return jack
  };

  jack.move = jack.fd = function (reach) {
    var next = poltocar(data.angle, reach);

    var x = data.x + next.x;
    var y = data.y - next.y;

    if (data.trace) {
      turf.beginPath();
      turf.moveTo(data.x, data.y);
      turf.lineTo(x, y);
      turf.stroke();

      path.push({ x: x, y: y });
    }

    return jack.goto(x, y)
  };

  jack.rt = function (v) { return jack.lt(-v); };
  jack.bk = function (v) { return jack.fd(-v); };

  return jack
};

module.exports = createTurtle;

