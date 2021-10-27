import { arrayTranslate } from "./utils"

const attackListeners = (gameBoardObject, playerObject) => {
  const grid = document.querySelector('.grid-2')

  const handler = e => {
    const dataIndex = parseInt(e.dataSet.index)
    const coordinatesObject = arrayTranslate(dataIndex)
    
    playerObject.attack(coordinatesObject.x, coordinatesObject.y, gameBoardObject.gameBoard)
    removeEventListener('click', handler)
  }

  grid.children.forEach(item => {
    item.addEventListener('click', handler)
  })
}



export default attackListeners