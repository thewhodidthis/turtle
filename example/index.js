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

var createTaxi = function (target) {
  var pass = target instanceof CanvasRenderingContext2D;

  if (!pass) {
    throw Error('Invalid rendering context')
  }

  var data = { x: 0, y: 0, angle: 0, trace: true };
  var taxi = {
    get data() {
      return Object.assign({}, data, { angle: deg(data.angle) })
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

    data.angle += rad(angle);

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

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

var step = { x: canvas.width / 3, y: canvas.height / 2 };
var cell = { x: step.x * 0.5, y: step.y * 0.5 };

var taxi = createTaxi(target).skin('white').mass(1.5);

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

