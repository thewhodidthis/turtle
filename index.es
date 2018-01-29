import { deg, rad } from '@thewhodidthis/arithmetics'
import poltocar from 'poltocar'

// # Turtle
// Graphics do

const createTurtle = (turf, load = {}) => {
  const pass = turf instanceof CanvasRenderingContext2D

  if (!pass) {
    throw Error('Invalid rendering context')
  }

  const { width: w, height: h } = turf.canvas

  const home = Object.assign({ x: w * 0.5, y: h * 0.5, angle: 0 }, load)
  const data = Object.assign({ trace: 1 }, home)

  const path = []

  // This turtle goes by the name of Jack :))
  const jack = {
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
  }

  jack.look = (style = turf.strokeStyle, width = turf.lineWidth) => {
    turf.strokeStyle = style
    turf.lineWidth = width

    return jack
  }

  jack.fill = (style) => {
    if (style) {
      turf.fillStyle = style
    }

    turf.beginPath()

    if (path.length) {
      path.forEach((p) => {
        turf.lineTo(p.x, p.y)
      })
    } else {
      turf.rect(0, 0, w, h)
    }

    turf.fill()

    return jack
  }

  jack.wipe = () => {
    turf.clearRect(0, 0, w, h)

    path.length = 0

    return jack
  }

  jack.home = () => jack.goto(home.x, home.y)
  jack.goto = (x, y) => {
    data.x = x || data.x
    data.y = y || data.y

    return jack
  }

  jack.down = jack.up = () => {
    data.trace = !data.trace

    return jack
  }

  jack.turn = jack.lt = (angle) => {
    data.angle += rad(angle)

    return jack
  }

  jack.move = jack.fd = (reach) => {
    const next = poltocar(data.angle, reach)

    const x = data.x + next.x
    const y = data.y - next.y

    if (data.trace) {
      turf.beginPath()
      turf.moveTo(data.x, data.y)
      turf.lineTo(x, y)
      turf.stroke()

      path.push({ x, y })
    }

    return jack.goto(x, y)
  }

  jack.rt = v => jack.lt(-v)
  jack.bk = v => jack.fd(-v)

  return jack
}

export default createTurtle
