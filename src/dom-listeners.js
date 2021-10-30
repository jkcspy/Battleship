import { arrayTranslate } from "./utils"
import ai from "./ai"

const attackListeners = (gameBoardTwoObject, playerOneObject, gameBoardOneObject, playerTwoObject) => {
  const grid = document.querySelector('.grid-2')

  const handler = e => {
    const dataIndex = parseInt(e.target.dataset.index)
    const coordinatesObject = arrayTranslate(dataIndex)
    
    playerOneObject.attack(coordinatesObject.x, coordinatesObject.y, gameBoardTwoObject)
    e.target.removeEventListener('click', handler)

    const aiCoordinates = ai.computerTurn()
    playerTwoObject.attack(aiCoordinates.x, aiCoordinates.y, gameBoardOneObject)
  }

  
  [...grid.children].forEach(item => {
    item.addEventListener('click', handler)
  })
}



export default attackListeners