import { deg, rad } from '@thewhodidthis/arithmetics'
import pol2car from 'poltocar'

// # Taxi
// Teeny tiny turtle graphics agent

const createTaxi = (target = {}, handler) => {
  if (!('canvas' in target)) {
    throw Error('Invalid rendering context')
  }

  const draw = typeof handler === 'function' ? handler : (sx, sy, dx, dy) => {
    target.beginPath()
    target.moveTo(sx, sy)
    target.lineTo(dx, dy)
    target.stroke()
  }

  const data = { x: 0, y: 0, angle: 0, trace: true }
  const taxi = {
    get data() {
      return Object.assign({}, data, { angle: deg(data.angle) })
    }
  }

  taxi.goto = (x = data.x, y = data.y) => {
    data.x = x
    data.y = y

    return taxi
  }

  taxi.mask = taxi.pu = () => {
    data.trace = false

    return taxi
  }

  taxi.tail = taxi.pd = () => {
    data.trace = true

    return taxi
  }

  taxi.turn = taxi.lt = (a = 0) => {
    data.angle += rad(a)

    return taxi
  }

  taxi.move = taxi.fd = (r) => {
    const step = pol2car(data.angle, r || 0)

    const x = data.x + step.x
    const y = data.y - step.y

    if (data.trace) {
      draw(data.x, data.y, x, y)
    }

    return taxi.goto(x, y)
  }

  taxi.rt = v => taxi.lt(-v)
  taxi.bk = v => taxi.fd(-v)

  return taxi
}

export default createTaxi
