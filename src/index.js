import { viewButtonListener, buttonsObject, directionButtonListener, muteButtonListener } from './dom-listeners'
import { initRenderGrid } from './dom-render'
import { gameLoop } from './game'

initRenderGrid()
viewButtonListener(buttonsObject)
directionButtonListener(buttonsObject)
muteButtonListener()
gameLoop()
