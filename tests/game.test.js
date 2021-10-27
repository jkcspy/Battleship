import { gameCompleteCheck, initGame } from '../src/game'

describe('tests for game end conditons', () => {
  test('game over when all ships hit on board 2', () => {
    const game = initGame()

    game.playerOne.attack(1,1,game.playerTwoBoard)
    game.playerOne.attack(1,2,game.playerTwoBoard)
    game.playerOne.attack(5,4,game.playerTwoBoard)
    game.playerOne.attack(5,5,game.playerTwoBoard)
    game.playerOne.attack(5,6,game.playerTwoBoard)

    expect(gameCompleteCheck(game.playerOneBoard, game.playerTwoBoard)).toBe(false)
  })

  test('game not over when 1 ship section not hit on board 2', () => {
    const game = initGame()

    game.playerOne.attack(1,1,game.playerTwoBoard)
    game.playerOne.attack(1,2,game.playerTwoBoard)
    game.playerOne.attack(5,4,game.playerTwoBoard)
    game.playerOne.attack(5,5,game.playerTwoBoard)

    expect(gameCompleteCheck(game.playerOneBoard, game.playerTwoBoard)).toBe(true)
  })

  test('game over all hit on board 2 and several misses', () => {
    const game = initGame()

    game.playerOne.attack(1,1,game.playerTwoBoard)
    game.playerOne.attack(1,2,game.playerTwoBoard)
    game.playerOne.attack(5,4,game.playerTwoBoard)
    game.playerOne.attack(5,5,game.playerTwoBoard)
    game.playerOne.attack(5,6,game.playerTwoBoard)
    game.playerOne.attack(8,8,game.playerTwoBoard)
    game.playerOne.attack(8,9,game.playerTwoBoard)

    expect(gameCompleteCheck(game.playerOneBoard, game.playerTwoBoard)).toBe(false)
  })
})