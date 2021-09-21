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
  const gameBoard = new Array(10).fill([new Array(10).fill('')])

  return { gameBoard }
}

export { shipFactory, gameBoardFactory }
