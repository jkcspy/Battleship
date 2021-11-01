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

const shipTypeCheck = () => {
  const messageDiv = document.querySelector('.message')
  const shipType = messageDiv.dataset.ship
  const shipTable = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
  }

  return shipTable[shipType]
}

export { coordinateTranslate, arrayTranslate, shipTypeCheck }
