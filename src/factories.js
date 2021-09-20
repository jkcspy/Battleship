const shipFactory = (length) => {
  const hitBoard = new Array(length).fill(0);

  const hit = (position) => {
    hitBoard[position] = 1;
  }

  const isSunk = () => {
    hitBoard.every(x => x === 1);
  }

  return {hitBoard,hit, isSunk}
}

export default shipFactory