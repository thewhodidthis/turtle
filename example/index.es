import { rand } from '@thewhodidthis/arithmetics'
import createTurtle from '../index.es'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

const turtle = createTurtle(target)
const stroll = (n) => {
  if (n === 0) {
    return
  }

  const a = rand(90, -90)
  const d = rand(4, 12)

  turtle.lt(a).fd(d)

  stroll(n - 1)
}

['#fff', '#f00', '#0ff', '#00f', '#f0f', '#ff0'].forEach((c) => {
  turtle.home().look(c)

  stroll(360)
})
