const shipFactory = (length) => {
  const hitBoard = new Array(length).fill(0)
  const sunk = [false] // this works as array is mutable but primitive is not and obj on gameboard is a reference.

  const isSunk = () => {
    sunk[0] = hitBoard.every(x => x === 1)
  }

  const hit = (position) => {
    hitBoard[position] = 1
    isSunk()
  }

  return { hitBoard, sunk, hit }
}

const gameBoardFactory = () => {
  const gameBoard = new Array(100).fill('')

  const coordinateTranslate = (x, y) => { 
    const arrayIndex = ((y-1)*10) + (x-1)
    return arrayIndex
  }

  const placeShip = (x, y, length, direction) => {
    const ship = shipFactory(length)

     switch (direction) {
      case 'up': 
      for (let i = 0; i <= length; i++){ gameBoard[coordinateTranslate(x,y-i)] = {hitIndex: i, isHit: false, ship: ship} }
        break
      case 'down':
        for (let i = 0; i <= length; i++){ gameBoard[coordinateTranslate(x,y+i)] = {hitIndex: i, isHit: false, ship: ship} }
        break
      case 'left':
        for (let i = 0; i <= length; i++){ gameBoard[coordinateTranslate(x-i,y)] = {hitIndex: i, isHit: false, ship: ship} }
        break
      case 'right':
        for (let i = 0; i <= length; i++){ gameBoard[coordinateTranslate(x+i,y)] = {hitIndex: i, isHit: false, ship: ship} }
        break
      default:
        console.log('Error:invalid direction for ship placement')
    }
  }

  const recieveAttack = (x, y) => {
    if (gameBoard[coordinateTranslate(x,y)] === '') {
      gameBoard[coordinateTranslate(x,y)] = 'x'
    }else {
      gameBoard[coordinateTranslate(x,y)].ship.hit(gameBoard[coordinateTranslate(x,y)].hitIndex)
      gameBoard[coordinateTranslate(x,y)].isHit = true
    }
  }

  const checkAllSunk = () => {
    const allShips = gameBoard.filter(e => typeof e === 'object' && typeof e.ship === 'object')

    return allShips.every(x => x.ship.sunk[0] === true)
  }

  return { gameBoard, placeShip, recieveAttack, checkAllSunk }
}

export { shipFactory, gameBoardFactory }
