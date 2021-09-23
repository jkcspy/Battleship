const shipFactory = (length) => {
  const hitBoard = new Array(length).fill(0)

  const hit = (position) => {
    hitBoard[position] = 1
    return hitBoard
  }

  const isSunk = () => {
    return hitBoard.every(x => x === 1)
  }

  return { hitBoard, isSunk, hit }
}

const gameBoardFactory = () => {
  const gameBoard = new Array(100).fill('')

  const coordinateTranslate = (x, y) => { 
    const arrayIndex = ((y-1)*10) + (x-1)
    return arrayIndex
  }

  const placeShip = (x, y) => {
    gameBoard[coordinateTranslate(x,y)] = 0
    return gameBoard
  }

  return { gameBoard, placeShip }
}

export { shipFactory, gameBoardFactory }
