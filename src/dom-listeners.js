import { arrayTranslate, coordinateTranslate, shipTypeCheck } from './utils'
import { shipPlacementData } from './placement'
import ai from './ai'

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
  const muteButton = document.querySelector('.mute')
  const audio = document.querySelector('.audio')

  muteButton.addEventListener('click', () => {
    if (muteButton.innerHTML === 'Un-Mute') {
      muteButton.innerHTML = 'Mute'
      audio.muted = false
    } else {
      muteButton.innerHTML = 'Un-Mute'
      audio.muted = true
    }
  })
}

const directionButtonListener = (buttonsObject) => {
  let count = 0
  const directions = ['Up', 'Down', 'Left', 'Right']

  buttonsObject.directionButton.addEventListener('click', () => {
    if (count < 3) {
      count++
      buttonsObject.directionButton.innerHTML = directions[count]
    } else {
      count = 0
      buttonsObject.directionButton.innerHTML = directions[count]
    }
  })
}

const buttonsObject = {
  viewButton: document.querySelector('.view'),
  xInput: document.querySelector('#x-input'),
  yInput: document.querySelector('#y-input'),
  directionButton: document.querySelector('.direction'),
  confirmButton: document.querySelector('.confirm')
}

const shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

const viewButtonListener = (buttonsObject) => {
  // TODO: do not allow to be clicked again before clearing or confirming placement
  buttonsObject.viewButton.addEventListener('click', () => {
    const coordinatesObject = {
      x: parseInt(buttonsObject.xInput.value),
      y: parseInt(buttonsObject.yInput.value),
      direction: buttonsObject.directionButton.innerHTML.toLowerCase(),
      shipIndex: []
    }
    const grid = document.querySelector('.placement-grid')
    const gridBoxArray = []

    viewButtonListenerLogic(coordinatesObject)

    if (coordinatesObject.shipIndex.every(item => item >= 0 && item < 100)) {
      // TODO: split off into helper function
      // TODO: stop ships being placed from 10-11 20-21 etc...
      coordinatesObject.shipIndex.forEach(item => {
        gridBoxArray.push(grid.querySelector(`[data-index='${item}'`))
      })
      if (gridBoxArray.every(item => !item.classList.contains('ship'))) {
        gridBoxArray.forEach(item => {
          item.classList.add('ship')
        })
      } else { alert('Try again that is not a valid placement') }
    } else { alert('Try again that is not a valid placement') }
  })
}
// TODO: add clear button and listener

const viewButtonListenerLogic = (coordinatesObject) => {
  if (coordinatesObject.direction === 'down') {
    for (let i = 0; i < shipTypeCheck(); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x, coordinatesObject.y + i))
    }
  } else if (coordinatesObject.direction === 'up') {
    for (let i = 0; i < shipTypeCheck(); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x, coordinatesObject.y - i))
    }
  } else if (coordinatesObject.direction === 'right') {
    for (let i = 0; i < shipTypeCheck(); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x + i, coordinatesObject.y))
    }
  } else if (coordinatesObject.direction === 'left') {
    for (let i = 0; i < shipTypeCheck(); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x - i, coordinatesObject.y))
    }
  }
}

const confirmButtonListener = (buttonsObject) => {
  let count = 0
  const direction = buttonsObject.directionButton.innerHTML.toLowerCase()
  const message = document.querySelector('.message')
  const x = buttonsObject.xInput.value
  const y = buttonsObject.yInput.value

  buttonsObject.confirmButton.addEventListener('click', () => {
    // TODO: do not allow click to do anything unless view listener clicked
    // TODO: when last ship placement done reveal game play boards
    const shipType = message.dataset.ship

    shipPlacementData.push({ shipType, direction, x, y })
    count++
    message.dataset.ship = shipArray[count]
    message.innerHTML = `Place your ${shipArray[count]}`
  })
}

export { attackListeners, directionButtonListener, viewButtonListener, confirmButtonListener, muteButtonListener, buttonsObject }
