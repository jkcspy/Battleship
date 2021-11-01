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

const viewButtonListener = (buttonsObject) => {
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

    if (coordinatesObject.shipIndex.every(item => item > 0 && item < 100)) {
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
  const direction = buttonsObject.directionButton.innerHTML.toLowerCase()
  const shipType = document.querySelector('.message').dataset.ship
  const x = buttonsObject.xInput.value
  const y = buttonsObject.yInput.value

  buttonsObject.confirmButton.addEventListener('click', () => {
    shipPlacementData.push({ shipType, direction, x, y })
  })
}

export { attackListeners, directionButtonListener, viewButtonListener, confirmButtonListener, muteButtonListener, buttonsObject }
