import 'cutaway'
import { report, assert } from 'tapeless'
import createTurtle from './index.es'

const { ok } = assert

try {
  createTurtle()
} catch (e) {
  ok(e instanceof Error, 'error', 'will throw sans context')
  ok(e.message === 'Invalid rendering context', 'error message is a match')
}

report()
