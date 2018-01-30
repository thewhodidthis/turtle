import turtle from '../index.es'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

const step = { x: canvas.width / 3, y: canvas.height / 2 }
const cell = { x: step.x * 0.5, y: step.y * 0.5 }

const taxi = turtle(target).skin('white').mass(1.5)

const repeat = (draw) => {
  const loop = (n) => {
    if (n === 0) {
      return
    }

    draw(n)
    loop(n - 1)
  }

  return loop
}

const sketch = (sides, R, t) => {
  const angle = 360 / sides
  const reach = 2 * R * Math.sin(Math.PI / sides)

  return () => {
    for (let i = 0; i < sides; i += 1) {
      taxi.turn(angle).move(reach)
    }

    taxi.turn(t)
  }
}

const size = 35
const grid = (v, i) => ({ x: i % 3, y: Math.floor(i / 3) })

Array.from({ length: 3 * 2 }).map(grid).forEach((v, i) => {
  const x = (v.x * step.x) + cell.x
  const y = (v.y * step.y) + cell.y

  const n = Math.min(i + 5, 9)
  const k = i % 2 ? 18 : 10

  taxi.goto(x, y)

  const form = sketch(n, size, 360 / k)
  const loop = repeat(form)

  loop(k)
})
