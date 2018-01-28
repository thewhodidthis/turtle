import { deg, rad } from '@thewhodidthis/arithmetics'
import poltocar from 'poltocar'

// # Turtle
// Graphics do

const createTurtle = (board, x = 0, y = x, angle = 0) => {
  const valid = board instanceof CanvasRenderingContext2D

  if (!valid) {
    throw Error('Invalid rendering context')
  }

  const { width: w, height: h } = board.canvas

  const trail = []
  const store = { angle, x, y, state: true }
  const agent = {
    get venue() {
      return { x: store.x, y: store.y }
    },
    get angle() {
      return deg(store.angle)
    },
    get score() {
      return trail
    }
  }

  agent.look = (style = board.strokeStyle, width = board.lineWidth) => {
    board.strokeStyle = style
    board.lineWidth = width

    return agent
  }

  agent.fill = (color) => {
    if (color) {
      board.fillStyle = color
    }

    if (trail.length) {
      trail.forEach((p) => {
        board.lineTo(p.x, p.y)
      })

      board.fill()
    } else {
      board.fillRect(0, 0, w, h)
    }

    return agent
  }

  agent.wipe = () => {
    board.clearRect(0, 0, w, h)

    trail.length = 0

    return agent
  }

  agent.home = () => agent.goto({ x: w * 0.5, y: h * 0.5 })
  agent.goto = (point = store) => {
    store.x = point.x
    store.y = point.y

    return agent
  }

  agent.pu = agent.pd = () => {
    store.state = !store.state

    return agent
  }

  agent.lt = (target = 0) => {
    store.angle += rad(target)

    return agent
  }

  agent.fd = (target = 0) => {
    const point = poltocar(store.angle, target)
    const delta = { x: store.x + point.x, y: store.y - point.y }

    if (store.state) {
      board.beginPath()
      board.moveTo(store.x, store.y)
      board.lineTo(delta.x, delta.y)
      board.stroke()

      trail.push(delta)
    }

    return agent.goto(delta)
  }

  agent.rt = v => agent.lt(-v)
  agent.bk = v => agent.fd(-v)

  return agent
}

export default createTurtle
