> Teeny tiny turtle thing

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/taxi
```

### Usage
```js
import turtle form '@thewhodidthis/taxi'

const canvas = document.createElement('canvas')
const target = canvas.getContext('2d')

const size = 99
const half = size * 0.5

// Initialize
const taxi = turtle(target)
    // Pen color
    .look('white')
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

const draw = (n) => {
    if (n === 0) {
        return
    }

    taxi.move(size).turn(90)

    draw(n - 1)
}

// Be square
draw(4)
``
