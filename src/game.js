import { playerFactory, gameBoardFactory } from "./factories";
import { renderPlayerGrid, renderOpponentGrid } from "./dom-render";

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

const gameCompleteCheck = () => {

}

const gameLoop = () => {
  initGame()

  const innerGameLoop = () => { 
    renderOpponentGrid()
    renderPlayerGrid()
  
    if(gameCompleteCheck()){ // if func returns false recursion stops
      setTimeout(gameLoop, 1000)
    }
  }

  innerGameLoop()
}

export { gameLoop }