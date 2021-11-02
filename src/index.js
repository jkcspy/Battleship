import { viewButtonListener, buttonsObject, directionButtonListener, muteButtonListener, confirmButtonListener, startGameListener } from './dom-listeners'
import { initRenderGrid } from './dom-render'

initRenderGrid()
viewButtonListener(buttonsObject)
directionButtonListener(buttonsObject)
confirmButtonListener(buttonsObject)
muteButtonListener()
startGameListener()
