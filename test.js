import 'cutaway'
import { report, assert } from 'tapeless'
import createTaxi from './index.mjs'

const { ok } = assert

try {
  createTaxi()
} catch (e) {
  ok
    .describe('will throw sans context')
    .test(e instanceof Error, 'error')
    .describe('error message is a match')
    .test(e.message === 'Invalid rendering context')
}

report()
