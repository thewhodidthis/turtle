import 'cutaway'
import { report, assert } from 'tapeless'
import createTaxi from './index.mjs'

const { ok } = assert

try {
  createTaxi()
} catch (e) {
  ok(e instanceof Error, 'error', 'will throw sans context')
  ok(e.message === 'Invalid rendering context', 'error message is a match')
}

report()
