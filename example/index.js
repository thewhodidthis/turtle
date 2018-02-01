(function () {
'use strict';

var TAU = 2 * Math.PI;

var RAD = 360 / TAU;
var DEG = TAU / 360;

var deg = function (x) { return x * RAD; };

var rad = function (x) { return x * DEG; };

var poltocar = function (t, r) {
  if ( t === void 0 ) t = 0;
  if ( r === void 0 ) r = 1;

  return ({
  x: r * Math.cos(t),
  y: r * Math.sin(t)
});
};

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
      return Object.assign({}, data, { angle: deg(data.angle) })
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

    data.angle += rad(a);

    return taxi
  };

  taxi.move = taxi.fd = function (r) {
    var step = poltocar(data.angle, r || 0);

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

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

target.lineWidth = 1.5;
target.strokeStyle = '#888';

var step = { x: canvas.width / 3, y: canvas.height / 2 };
var cell = { x: step.x * 0.5, y: step.y * 0.5 };

var taxi = createTaxi(target);

var repeat = function (draw) {
  var loop = function (n) {
    if (n === 0) {
      return
    }

    draw(n);
    loop(n - 1);
  };

  return loop
};

var sketch = function (sides, R, t) {
  var angle = 360 / sides;
  var reach = 2 * R * Math.sin(Math.PI / sides);

  return function () {
    for (var i = 0; i < sides; i += 1) {
      taxi.turn(angle).move(reach);
    }

    taxi.turn(t);
  }
};

var size = 35;
var grid = function (v, i) { return ({ x: i % 3, y: Math.floor(i / 3) }); };

Array.from({ length: 3 * 2 }).map(grid).forEach(function (v, i) {
  var x = (v.x * step.x) + cell.x;
  var y = (v.y * step.y) + cell.y;

  var n = Math.min(i + 5, 9);
  var k = i % 2 ? 18 : 10;

  taxi.goto(x, y);

  var form = sketch(n, size, 360 / k);
  var loop = repeat(form);

  loop(k);
});

}());

