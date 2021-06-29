(() => {
  // ../node_modules/.pnpm/@thewhodidthis+arithmetics@0.0.7/node_modules/@thewhodidthis/arithmetics/index.mjs
  var TAU = 2 * Math.PI;
  var RAD = 360 / TAU;
  var DEG = TAU / 360;
  var deg = (x) => x * RAD;
  var rad = (x) => x * DEG;

  // ../node_modules/.pnpm/poltocar@2.0.7/node_modules/poltocar/index.mjs
  var poltocar = (a = 0, r = 1) => ({
    x: r * Math.cos(a),
    y: r * Math.sin(a)
  });
  var poltocar_default = poltocar;

  // ../main.js
  var createTaxi = (target2 = {}, handler) => {
    if (!("canvas" in target2)) {
      throw Error("Invalid rendering context");
    }
    const draw = typeof handler === "function" ? handler : (sx, sy, dx, dy) => {
      target2.beginPath();
      target2.moveTo(sx, sy);
      target2.lineTo(dx, dy);
      target2.stroke();
    };
    const data = { x: 0, y: 0, angle: 0, trace: true };
    const taxi2 = {
      get data() {
        return Object.assign({}, data, { angle: deg(data.angle) });
      }
    };
    taxi2.goto = (x = data.x, y = data.y) => {
      data.x = x;
      data.y = y;
      return taxi2;
    };
    taxi2.mask = taxi2.pu = () => {
      data.trace = false;
      return taxi2;
    };
    taxi2.tail = taxi2.pd = () => {
      data.trace = true;
      return taxi2;
    };
    taxi2.turn = taxi2.lt = (a = 0) => {
      data.angle += rad(a);
      return taxi2;
    };
    taxi2.move = taxi2.fd = (r) => {
      const step2 = poltocar_default(data.angle, r || 0);
      const x = data.x + step2.x;
      const y = data.y - step2.y;
      if (data.trace) {
        draw(data.x, data.y, x, y);
      }
      return taxi2.goto(x, y);
    };
    taxi2.rt = (v) => taxi2.lt(-v);
    taxi2.bk = (v) => taxi2.fd(-v);
    return taxi2;
  };
  var main_default = createTaxi;

  // index.js
  var canvas = document.querySelector("canvas");
  var target = canvas.getContext("2d");
  target.lineWidth = 1.5;
  target.strokeStyle = "#888";
  var step = { x: canvas.width / 3, y: canvas.height / 2 };
  var cell = { x: step.x * 0.5, y: step.y * 0.5 };
  var taxi = main_default(target);
  var repeat = (draw) => {
    const loop = (n) => {
      if (n === 0) {
        return;
      }
      draw(n);
      loop(n - 1);
    };
    return loop;
  };
  var sketch = (sides, R, t) => {
    const angle = 360 / sides;
    const reach = 2 * R * Math.sin(Math.PI / sides);
    return () => {
      for (let i = 0; i < sides; i += 1) {
        taxi.turn(angle).move(reach);
      }
      taxi.turn(t);
    };
  };
  var size = 35;
  var grid = (_, i) => ({ x: i % 3, y: Math.floor(i / 3) });
  Array.from({ length: 3 * 2 }).map(grid).forEach((v, i) => {
    const x = v.x * step.x + cell.x;
    const y = v.y * step.y + cell.y;
    const n = Math.min(i + 5, 9);
    const k = i % 2 ? 18 : 10;
    taxi.goto(x, y);
    const form = sketch(n, size, 360 / k);
    const loop = repeat(form);
    loop(k);
  });
})();
