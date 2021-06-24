import "cutaway"
import { assert, report } from "tapeless/browser"
import createTaxi from "./main.js"

const { ok } = assert

try {
  createTaxi()
} catch (e) {
  ok
    .describe("will throw sans context")
    .test(e instanceof Error, "error")
    .describe("error message is a match")
    .test(e.message === "Invalid rendering context")
}

report()
