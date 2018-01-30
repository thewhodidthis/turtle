import { deg, rad } from '@thewhodidthis/arithmetics'
import poltocar from 'poltocar'

// # Taxi
// Teeny tiny turtle graphics helper

const createAgent = (target) => {
  const pass = target instanceof CanvasRenderingContext2D

  if (!pass) {
    throw Error('Invalid rendering context')
  }

  const data = { x: 0, y: 0, angle: 0, trace: true }
  const taxi = {
    get data() {
      return Object.assign({}, data, { angle: deg(data.angle) })
    }
  }

  taxi.skin = (s) => {
    target.strokeStyle = s

    return taxi
  }

  taxi.mass = (n) => {
    target.lineWidth = n

    return taxi
  }

  taxi.goto = (x, y) => {
    data.x = x || data.x
    data.y = y || data.y

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

  taxi.turn = taxi.lt = (angle = 0) => {
    data.angle += rad(angle)

    return taxi
  }

  taxi.move = taxi.fd = (reach = 0) => {
    const next = poltocar(data.angle, reach)

    const x = data.x + next.x
    const y = data.y - next.y

    if (data.trace) {
      target.beginPath()
      target.moveTo(data.x, data.y)
      target.lineTo(x, y)
      target.stroke()
    }

    return taxi.goto(x, y)
  }

  taxi.rt = v => taxi.lt(-v)
  taxi.bk = v => taxi.fd(-v)

  return taxi
}

export default createAgent
