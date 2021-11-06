import { arrayTranslate, coordinateTranslate, shipTypeCheck, validDirectionCheck } from './utils'
import { shipPlacementData } from './placement'
import ai from './ai'
import { gameLoop } from './game'

// TODO: break up repeated code and large functions into smaller functions

const buttonsObject = {
  viewButton: document.querySelector('.view'),
  xInput: document.querySelector('#x-input'),
  yInput: document.querySelector('#y-input'),
  directionButton: document.querySelector('.direction'),
  confirmButton: document.querySelector('.confirm'),
  clearButton: document.querySelector('.clear')
}

const shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

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

const restartEventListener = () => {
  const restartButton = document.querySelector('.restart')

  restartButton.addEventListener('click', () => {
    location.reload()
  })
}

const startGameListener = () => {
  const startButton = document.querySelector('.start-game')
  const startContainer = document.querySelector('.start-game-container')
  const placementInterface = document.querySelector('.placement-interface')
  const nameHolder = document.querySelector('.title')
  const name = document.querySelector('#user-name')
  const audio = document.querySelector('.audio')
  const message = document.querySelector('.message')

  startButton.addEventListener('click', () => {
    nameHolder.setAttribute('data-name', name.value)
    name.value = ''
    startContainer.style.display = 'none'
    placementInterface.style.display = 'flex'
    audio.muted = false
    audio.autoplay = true
    message.innerHTML = `
    Admiral ${nameHolder.dataset.name}, the enemy fleet approaches. What are your orders?
    Where should we position the carrier?
    `
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
    const message = document.querySelector('.message')
    const shipType = message.dataset.ship

    shipPlacementLogic(coordinatesObject, shipType)
    placementCheckLogic(coordinatesObject, gridBoxArray, grid, buttonsObject, shipType)
  })
}

const placementCheckLogic = (coordinatesObject, gridBoxArray, grid, buttonsObject, shipType) => {
  if (validDirectionCheck(coordinatesObject.x, coordinatesObject.y, coordinatesObject.direction, shipTypeCheck(shipType))) {
    if (coordinatesObject.shipIndex.every(item => item >= 0 && item < 100)) {
      coordinatesObject.shipIndex.forEach(item => {
        gridBoxArray.push(grid.querySelector(`[data-index='${item}'`))
      })
      if (gridBoxArray.every(item => !item.classList.contains('ship'))) {
        gridBoxArray.forEach(item => {
          item.classList.add('ship')
          item.classList.add('await-confirm')
        })
        toggleConfirmButtonsOn(buttonsObject)
      } else { alert('Try again that is not a valid placement') }
    } else { alert('Try again that is not a valid placement') }
  } else { alert('Try again that is not a valid placement') }
}

const shipPlacementLogic = (coordinatesObject, shipType) => {
  if (coordinatesObject.direction === 'down') {
    for (let i = 0; i < shipTypeCheck(shipType); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x, coordinatesObject.y + i))
    }
  } else if (coordinatesObject.direction === 'up') {
    for (let i = 0; i < shipTypeCheck(shipType); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x, coordinatesObject.y - i))
    }
  } else if (coordinatesObject.direction === 'right') {
    for (let i = 0; i < shipTypeCheck(shipType); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x + i, coordinatesObject.y))
    }
  } else if (coordinatesObject.direction === 'left') {
    for (let i = 0; i < shipTypeCheck(shipType); i++) {
      coordinatesObject.shipIndex.push(coordinateTranslate(coordinatesObject.x - i, coordinatesObject.y))
    }
  }
}

const confirmButtonListener = (buttonsObject) => {
  let count = 0
  const message = document.querySelector('.message')
  const placementInterface = document.querySelector('.placement-interface')
  const gridOne = document.querySelector('.grid-1')
  const gridTwo = document.querySelector('.grid-2')

  buttonsObject.confirmButton.addEventListener('click', () => {
    const length = shipTypeCheck()
    const x = parseInt(buttonsObject.xInput.value)
    const y = parseInt(buttonsObject.yInput.value)
    const direction = buttonsObject.directionButton.innerHTML.toLowerCase()
    const shipToConfirm = document.querySelectorAll('.await-confirm')

    if (message.dataset.ship === 'destroyer') {
      shipPlacementData.push({ length, direction, x, y })
      placementInterface.style.display = 'none'
      gridOne.style.display = 'grid'
      gridTwo.style.display = 'grid'
      togglePlacementButtonsOn(buttonsObject)
      gameLoop()
    } else {
      shipPlacementData.push({ length, direction, x, y })
      count++
      message.dataset.ship = shipArray[count]
      message.innerHTML = `Where should we position the ${shipArray[count]}?`
      togglePlacementButtonsOn(buttonsObject);

      [...shipToConfirm].forEach(item => {
        item.classList.remove('await-confirm')
      })
    }
  })
}
const clearButtonListener = (buttonsObject) => {
  buttonsObject.clearButton.addEventListener('click', () => {
    const shipToConfirm = document.querySelectorAll('.await-confirm');

    [...shipToConfirm].forEach(item => {
      item.classList.remove('ship')
      item.classList.remove('await-confirm')
      togglePlacementButtonsOn(buttonsObject)
    })
  })
}

const togglePlacementButtonsOn = buttonsObject => {
  buttonsObject.xInput.disabled = false
  buttonsObject.yInput.disabled = false
  buttonsObject.directionButton.disabled = false
  buttonsObject.viewButton.disabled = false
  buttonsObject.confirmButton.disabled = true
  buttonsObject.clearButton.disabled = true
}
const toggleConfirmButtonsOn = buttonsObject => {
  buttonsObject.xInput.disabled = true
  buttonsObject.yInput.disabled = true
  buttonsObject.directionButton.disabled = true
  buttonsObject.viewButton.disabled = true
  buttonsObject.confirmButton.disabled = false
  buttonsObject.clearButton.disabled = false
}

const attachAllEventListeners = (buttonsObject) => {
  viewButtonListener(buttonsObject)
  directionButtonListener(buttonsObject)
  confirmButtonListener(buttonsObject)
  muteButtonListener()
  startGameListener()
  restartEventListener()
  clearButtonListener(buttonsObject)
}

export { attackListeners, attachAllEventListeners, buttonsObject }
