import createTurtle from '../index.es'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

const turtle = createTurtle(target)

const render = (total = 0) => {
  if (total === 0) {
    return false
  }

  turtle
    .home()
    .rt(6)
    .pu()
    .fd(50)
    .pd()
    .fd(70)

  return render(total - 1)
}

turtle.look('white')
render(360 / 6)
