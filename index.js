'use strict';

var arithmetics = require('@thewhodidthis/arithmetics');
var poltocar = require('poltocar');

// # Turtle
// Graphics do

var createTurtle = function (board, x, y, angle) {
  if ( x === void 0 ) x = 0;
  if ( y === void 0 ) y = x;
  if ( angle === void 0 ) angle = 0;

  var valid = board instanceof CanvasRenderingContext2D;

  if (!valid) {
    throw Error('Invalid rendering context')
  }

  var ref = board.canvas;
  var w = ref.width;
  var h = ref.height;

  var trail = [];
  var store = { angle: angle, x: x, y: y, state: true };
  var agent = {
    get venue() {
      return { x: store.x, y: store.y }
    },
    get angle() {
      return arithmetics.deg(store.angle)
    },
    get score() {
      return trail
    }
  };

  agent.look = function (style, width) {
    if ( style === void 0 ) style = board.strokeStyle;
    if ( width === void 0 ) width = board.lineWidth;

    board.strokeStyle = style;
    board.lineWidth = width;

    return agent
  };

  agent.fill = function (color) {
    if (color) {
      board.fillStyle = color;
    }

    if (trail.length) {
      trail.forEach(function (p) {
        board.lineTo(p.x, p.y);
      });

      board.fill();
    } else {
      board.fillRect(0, 0, w, h);
    }

    return agent
  };

  agent.wipe = function () {
    board.clearRect(0, 0, w, h);

    trail.length = 0;

    return agent
  };

  agent.home = function () { return agent.goto({ x: w * 0.5, y: h * 0.5 }); };
  agent.goto = function (point) {
    if ( point === void 0 ) point = store;

    store.x = point.x;
    store.y = point.y;

    return agent
  };

  agent.pu = agent.pd = function () {
    store.state = !store.state;

    return agent
  };

  agent.lt = function (target) {
    if ( target === void 0 ) target = 0;

    store.angle += arithmetics.rad(target);

    return agent
  };

  agent.fd = function (target) {
    if ( target === void 0 ) target = 0;

    var point = poltocar(store.angle, target);
    var delta = { x: store.x + point.x, y: store.y - point.y };

    if (store.state) {
      board.beginPath();
      board.moveTo(store.x, store.y);
      board.lineTo(delta.x, delta.y);
      board.stroke();

      trail.push(delta);
    }

    return agent.goto(delta)
  };

  agent.rt = function (v) { return agent.lt(-v); };
  agent.bk = function (v) { return agent.fd(-v); };

  return agent
};

module.exports = createTurtle;

