(function () {
  'use strict';

  const TAU = 2 * Math.PI;

  const RAD = 360 / TAU;
  const DEG = TAU / 360;

  // Convert radians to degrees
  const deg = x => x * RAD;

  // Convert degrees to radians
  const rad = x => x * DEG;

  /**
   * Helps covert from polar
   * @module poltocar
   * @param {Number} t - Angle (theta)
   * @param {Number} r - Radius
   * @returns {Object} - Vector like
   * @example
   * poltocar(Math.PI);
   */
  const poltocar = (t = 0, r = 1) => ({
    x: r * Math.cos(t),
    y: r * Math.sin(t)
  });

  // # Taxi
  // Teeny tiny turtle graphics agent

  const createTaxi = (target = {}, handler) => {
    if (!('canvas' in target)) {
      throw Error('Invalid rendering context')
    }

    const draw = typeof handler === 'function' ? handler : (sx, sy, dx, dy) => {
      target.beginPath();
      target.moveTo(sx, sy);
      target.lineTo(dx, dy);
      target.stroke();
    };

    const data = { x: 0, y: 0, angle: 0, trace: true };
    const taxi = {
      get data() {
        return Object.assign({}, data, { angle: deg(data.angle) })
      }
    };

    taxi.goto = (x = data.x, y = data.y) => {
      data.x = x;
      data.y = y;

      return taxi
    };

    taxi.mask = taxi.pu = () => {
      data.trace = false;

      return taxi
    };

    taxi.tail = taxi.pd = () => {
      data.trace = true;

      return taxi
    };

    taxi.turn = taxi.lt = (a = 0) => {
      data.angle += rad(a);

      return taxi
    };

    taxi.move = taxi.fd = (r) => {
      const step = poltocar(data.angle, r || 0);

      const x = data.x + step.x;
      const y = data.y - step.y;

      if (data.trace) {
        draw(data.x, data.y, x, y);
      }

      return taxi.goto(x, y)
    };

    taxi.rt = v => taxi.lt(-v);
    taxi.bk = v => taxi.fd(-v);

    return taxi
  };

  const canvas = document.querySelector('canvas');
  const target = canvas.getContext('2d');

  target.lineWidth = 1.5;
  target.strokeStyle = '#888';

  const step = { x: canvas.width / 3, y: canvas.height / 2 };
  const cell = { x: step.x * 0.5, y: step.y * 0.5 };

  const taxi = createTaxi(target);

  const repeat = (draw) => {
    const loop = (n) => {
      if (n === 0) {
        return
      }

      draw(n);
      loop(n - 1);
    };

    return loop
  };

  const sketch = (sides, R, t) => {
    const angle = 360 / sides;
    const reach = 2 * R * Math.sin(Math.PI / sides);

    return () => {
      for (let i = 0; i < sides; i += 1) {
        taxi.turn(angle).move(reach);
      }

      taxi.turn(t);
    }
  };

  const size = 35;
  const grid = (v, i) => ({ x: i % 3, y: Math.floor(i / 3) });

  Array.from({ length: 3 * 2 }).map(grid).forEach((v, i) => {
    const x = (v.x * step.x) + cell.x;
    const y = (v.y * step.y) + cell.y;

    const n = Math.min(i + 5, 9);
    const k = i % 2 ? 18 : 10;

    taxi.goto(x, y);

    const form = sketch(n, size, 360 / k);
    const loop = repeat(form);

    loop(k);
  });

}());
