> Teeny tiny turtle thing

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/taxi
```

### Usage
```js
import createTaxi form '@thewhodidthis/taxi'

const canvas = document.createElement('canvas')
const target = canvas.getContext('2d')

const size = 99
const half = size * 0.5

const jack = createTaxi(target)

// Mix in a couple of helper methods for the sake of it
const jill = Object.assign({
    skin(s) {
        target.strokeStyle = s

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

    taxi.move(size).turn(90)

    tick(n - 1)
}

// Be square
tick(4)
``
