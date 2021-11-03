const shipPlacementData = []

const placePlayerShips = gameBoardObject => {
  shipPlacementData.forEach(item => {
    gameBoardObject.placeShip(item.x, item.y, item.length, item.direction)
  })
}
export { placePlayerShips, shipPlacementData }
