import { arrayTranslate, coordinateTranslate, shipTypeCheck } from "./utils"
import { shipPlacementData } from "./placement"
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

const muteButtonListener = () => {
  
}

const directionButtonListener = () => {

}

const buttonsObject = {
  viewButton : document.querySelector('.view'),
  xInput : document.querySelector('#x-input'),
  yInput : document.querySelector('#y-input'),
  directionButton : document.querySelector('.direction')
}

const viewButtonListener = (buttonsObject) => {
  buttonsObject.viewButton.addEventListener('click', () => {
    const x = parseInt(buttonsObject.xInput.value)
    const y = parseInt(buttonsObject.yInput.value)
    const direction = buttonsObject.directionButton.innerHTML.toLowerCase()
    const shipIndex = []
    const grid = document.querySelector('.placement-grid')
    let gridBoxArray = []

    if(direction === 'down'){
      for(let i = 0; i < shipTypeCheck(); i++){
        shipIndex.push(coordinateTranslate(x,y+i))
      }
    } 
    if(direction === 'up'){
      for(let i = 0; i < shipTypeCheck(); i++){
        shipIndex.push(coordinateTranslate(x,y-i))
      }
    } 
    if(direction === 'right'){
      for(let i = 0; i < shipTypeCheck(); i++){
        shipIndex.push(coordinateTranslate(x+i,y))
      }
    } 
    if(direction === 'left'){
      for(let i = 0; i < shipTypeCheck(); i++){
        shipIndex.push(coordinateTranslate(x-i,y))
      }
    } 

    shipIndex.forEach(item => {
      gridBoxArray.push(grid.querySelector(`[data-index='${item}'`)) 
    })

    gridBoxArray.forEach( item => {
      item.classList.add('ship')
    })
  })
}

const confirmButtonListener = () => {
   shipPlacementData.push()
}

export { attackListeners, directionButtonListener, viewButtonListener, confirmButtonListener, buttonsObject } 