import { gameBoardFactory } from "../src/factories";
import { randomPlacementShips } from "../src/placement";


describe('random shp placement tests', () => {

  test('test for 5 ships placed on board', () => {
    const gameBoard = gameBoardFactory()
    randomPlacementShips(gameBoard) 
    const filter = gameBoard.gameBoard.filter(item => item !== '' )

    expect(filter.length).toBe(17)
  })

  test('test that array contains 100 items', () => {
    const gameBoard = gameBoardFactory()
    randomPlacementShips(gameBoard) 

    expect(gameBoard.gameBoard.length).toBe(100)
  })
  // Cannot test for random placement
})