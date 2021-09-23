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

  const placeShip = (x, y, length, direction) => {
     switch (direction) {
      case 'up': 
      for (let i = 0; i <= length; i++){
        gameBoard[coordinateTranslate(x,y-i)] = 0
      }
        break
      case 'down':
        for (let i = 0; i <= length; i++){
          gameBoard[coordinateTranslate(x,y+i)] = 0
        }
        break
      case 'left':
        for (let i = 0; i <= length; i++){
          gameBoard[coordinateTranslate(x-i,y)] = 0
        }
        break
      case 'right':
        for (let i = 0; i <= length; i++){
          gameBoard[coordinateTranslate(x+i,y)] = 0
        }
        break
      default:
        console.log('Error:invalid direction for ship placement')
    }
    return gameBoard
  }

  return { gameBoard, placeShip }
}

export { shipFactory, gameBoardFactory }
