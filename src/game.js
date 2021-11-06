import { playerFactory, gameBoardFactory } from './factories'
import { renderPlayerGrid, renderOpponentGrid } from './dom-render'
import { attackListeners } from './dom-listeners'
import { placePlayerShips } from './placement'

const initGame = () => {
  const playerOne = playerFactory('Player 1')
  const playerTwo = playerFactory('Player 2')
  const playerOneBoard = gameBoardFactory()
  const playerTwoBoard = gameBoardFactory()

  placePlayerShips(playerOneBoard)
  // TODO: function for placing AI ships randomly
  playerTwoBoard.placeShip(1, 1, 5, 'down')
  playerTwoBoard.placeShip(2, 1, 4, 'down')
  playerTwoBoard.placeShip(3, 1, 3, 'right')
  playerTwoBoard.placeShip(2, 9, 3, 'right')
  playerTwoBoard.placeShip(5, 5, 2, 'down')

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
    } else {
      if (game.playerTwoBoard.checkAllSunk()) {
        alert('The day is ours. All enemy ships have been sunk')
      } else { alert('All is lost. Our fleet is destroyed') }
    }
  }
  innerGameLoop()
}

export { gameLoop, initGame, gameCompleteCheck }
