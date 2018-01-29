(function () {
'use strict';

var TAU = 2 * Math.PI;

var RAD = 360 / TAU;
var DEG = TAU / 360;

var deg = function (x) { return x * RAD; };

var rad = function (x) { return x * DEG; };

var rand = function (hi, lo) {
  if ( hi === void 0 ) hi = 0;
  if ( lo === void 0 ) lo = 0;

  return Math.floor((Math.random() * (hi - lo))) + lo;
};

var poltocar = function (t, r) {
  if ( t === void 0 ) t = 0;
  if ( r === void 0 ) r = 1;

  return ({
  x: r * Math.cos(t),
  y: r * Math.sin(t)
});
};

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
      return deg(data.angle)
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
    data.angle += rad(angle);

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

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

var turtle = createTurtle(target);
var stroll = function (n) {
  if (n === 0) {
    return
  }

  var a = rand(90, -90);
  var d = rand(4, 12);

  turtle.lt(a).fd(d);

  stroll(n - 1);
};

['#fff', '#f00', '#0ff', '#00f', '#f0f', '#ff0'].forEach(function (c) {
  turtle.home().look(c);

  stroll(360);
});

}());

