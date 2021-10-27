import { initRenderGrid } from "./dom-render"
import { gameLoop } from "./game"
import attackListeners from "./dom-listeners"

(() => {
  initRenderGrid()
  attackListeners()
  gameLoop()
})()

