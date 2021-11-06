const coordinateTranslate = (x, y) => {
  const arrayIndex = ((y - 1) * 10) + (x - 1)
  return arrayIndex
}

const arrayTranslate = (index) => {
  const adjustedIndex = index + 1
  const indexString = adjustedIndex.toString()
  const x = indexString.slice(-1) === '0' ? 10 : parseInt(indexString.slice(-1))
  const y = Math.ceil((adjustedIndex / 10) - 0.01)

  return { x, y }
}

const shipTypeCheck = (shipType) => {
  const shipTable = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  }
  return shipTable[shipType]
}

const validDirectionCheck = (x, y, direction, length) => {
  if (direction === 'up') {
    if (y > length) {
      return true
    }
  } else if (direction === 'down') {
    if (y < length) {
      return true
    }
  } else if (direction === 'left') {
    if (x > length) {
      return true
    }
  } else if (direction === 'right') {
    if (x < length) {
      return true
    }
  }
  return false
}

export { coordinateTranslate, arrayTranslate, shipTypeCheck, validDirectionCheck }
