import { playerFactory, gameBoardFactory } from "./factories";
import { renderPlayerGrid, renderOpponentGrid } from "./dom-render";
import attackListeners from "./dom-listeners";

const initGame = () => {
  const playerOne = playerFactory('Player 1')
  const playerTwo = playerFactory('Player 2')
  const playerOneBoard = gameBoardFactory()
  const playerTwoBoard = gameBoardFactory()
 
  //remove later initial setup 
  playerOneBoard.placeShip(2, 2, 2, 'down')
  playerOneBoard.placeShip(5, 6, 3, 'down')
  playerTwoBoard.placeShip(1, 1, 2, 'down')
  playerTwoBoard.placeShip(5, 4, 3, 'down')


  return { playerOne, playerOneBoard, playerTwo, playerTwoBoard }
}

const gameCompleteCheck = (gameBoardOneObject, gameBoardTwoObject) => {
  if(gameBoardOneObject.checkAllSunk()) { return false }
  if(gameBoardTwoObject.checkAllSunk()) { return false }

  return true
}

const gameLoop = () => {
  const game = initGame()

  attackListeners(game.playerTwoBoard, game.playerOne, game.playerOneBoard, game.playerTwo)

  const innerGameLoop = (() => { 
    renderOpponentGrid(game.playerTwoBoard.gameBoard)
    renderPlayerGrid(game.playerOneBoard.gameBoard)
  
    if(gameCompleteCheck(game.playerOneBoard.gameBoard, game.playerTwoBoard.gameBoard)) { 
      // if func returns false recursion reaches base case and stops.
      setTimeout(innerGameLoop, 1000) // JavaScript is single threaded so traditional while loop will block thread.
    }
  })()
}

export { gameLoop, initGame, gameCompleteCheck }