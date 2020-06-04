## about

Teeny tiny [turtle graphics](https://docs.python.org/3.3/library/turtle.htm) module.

## setup

Fetch latest from GitHub directly:

```sh
npm install thewhodidthis/taxi
```

## usage

Initialize with a [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to then be drawing on. For example,

```js
import createTaxi from '@thewhodidthis/taxi'

const canvas = document.createElement('canvas')
const target = canvas.getContext('2d')

const size = 99
const half = size * 0.5

const jack = createTaxi(target)

// Mix in a couple of helper methods for the sake of it
const jill = Object.assign({
  skin(s) {
    target.strokeStyle = sl

    return this
  },
  hint(n) {
    target.lineWidth = n

    return this
  }
}, jack)

// Prepare
jill
  // Pen color
  .skin('red')
  // Move to canvas mid
  .goto(canvas.width * 0.5, canvas.height * 0.5)
  // Pen up
  .pu()
  // Go back a bit
  .bk(half)
  // Turn right
  .rt(90)
  // Go back again
  .bk(half)
  // Pen down
  .pd()

const tick = (n) => {
  if (n === 0) {
    return
  }

  jill.move(size).turn(90)

  tick(n - 1)
}

// Be square
tick(4)
```
