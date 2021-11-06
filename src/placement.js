import ai from "./ai"

const shipPlacementData = []

const placePlayerShips = gameBoardObject => {
  shipPlacementData.forEach(item => {
    gameBoardObject.placeShip(item.x, item.y, item.length, item.direction)
  })
}

const randomPlacementShips = gameBoardObject => {
  const placementArray = []
  let extraShipCheck = false

  for (let i = 5; i > 0; i--) {
    let validMoveFound = false

    while (!validMoveFound) {
      let validDirection = false
      let randomCoordinates;
      let direction;

      while (!validDirection) {
        randomCoordinates = ai.computerTurn()
        direction = randomDirection()
        if (validDirectionCheck(randomCoordinates.x, randomCoordinates.y, direction)) { validDirection = true }
      }

      const shipPlacementCoordinates = addDirectionToCoordinates(randomCoordinates, direction, i)
      const check = placementCheck(shipPlacementCoordinates, placementArray)

      if (!check) {
        gameBoardObject.placeShip(randomCoordinates.x, randomCoordinates.y, i, direction)
        validMoveFound = true
      }

      if (extraShipCheck === false && i === 3) {
        extraShipCheck = true
        i++
      }
    }
  }
}

const randomDirection = () => {
  const random = Math.random()

  if (random < 0.25) {
    return 'up'
  } else if (random >= 0.25 && random < 0.5) {
    return 'down'
  } else if (random >= 0.5 && random < 0.75) {
    return 'left'
  } else { return 'right' }
}

const addDirectionToCoordinates = (coordinates, direction, length) => {
  const coordinatesArray = []

  coordinatesArray.push(coordinates)
  if (direction === 'up') {
    for (let i = 1; i < length; i++) {
      coordinatesArray.push({ x: coordinates.x, y: (coordinates.y - i) })
    }
  } else if (direction === 'down') {
    for (let i = 1; i < length; i++) {
      coordinatesArray.push({ x: coordinates.x, y: (coordinates.y + i) })
    }
  } else if (direction === 'right') {
    for (let i = 1; i < length; i++) {
      coordinatesArray.push({ x: (coordinates.x + i), y: coordinates.y })
    }
  } else if (direction === 'left') {
    for (let i = 1; i < length; i++) {
      coordinatesArray.push({ x: (coordinates.x - i), y: coordinates.y })
    }
  }

  return coordinatesArray
}

const placementCheck = (array, checkArray) => checkArray.some(item => array.includes(item))

const validDirectionCheck = (x, y, direction) => {
  if (direction === 'up') {
    if (y > 5) {
      return true
    }
  } else if (direction === 'down') {
    if (y < 5) {
      return true
    }
  } else if (direction === 'left') {
    if (x > 5) {
      return true
    }
  } else if (direction === 'right') {
    if (x < 5) {
      return true
    }
  }
  return false
}
export { placePlayerShips, randomPlacementShips, shipPlacementData }
