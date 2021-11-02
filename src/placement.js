const shipPlacementData = [] // array to hold coordinates objects for ship placement

const placePlayerShips = gameBoardObject => {
  shipPlacementData.forEach(item => {
    gameBoardObject.placeShip(item.x, item.y, item.length, item.direction)
  })
}
export { placePlayerShips, shipPlacementData }
