import { playerFactory, gameBoardFactory } from './factories'
import { renderPlayerGrid, renderOpponentGrid } from './dom-render'
import { attackListeners } from './dom-listeners'

const initGame = () => {
  const playerOne = playerFactory('Player 1')
  const playerTwo = playerFactory('Player 2')
  const playerOneBoard = gameBoardFactory()
  const playerTwoBoard = gameBoardFactory()

  return { playerOne, playerOneBoard, playerTwo, playerTwoBoard }
}

const gameCompleteCheck = (gameBoardOneObject, gameBoardTwoObject) => {
  if (gameBoardOneObject.checkAllSunk()) { return false }
  if (gameBoardTwoObject.checkAllSunk()) { return false }

  return true
}

const gameLoop = () => {
  const game = initGame()

  attackListeners(game.playerTwoBoard, game.playerOne, game.playerOneBoard, game.playerTwo)

  const innerGameLoop = () => {
    renderOpponentGrid(game.playerTwoBoard)
    renderPlayerGrid(game.playerOneBoard)

    if (gameCompleteCheck(game.playerOneBoard, game.playerTwoBoard)) {
      // if func returns false recursion reaches base case and stops.
      setTimeout(innerGameLoop, 100) // JavaScript is single threaded so traditional while loop will block thread.
    }
  }
  innerGameLoop()
}

export { gameLoop, initGame, gameCompleteCheck }
