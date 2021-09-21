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

export default shipFactory
