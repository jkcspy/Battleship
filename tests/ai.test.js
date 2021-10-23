import ai from "../src/ai";

describe('tests for AI random moves', () => {
  test('ai returns random coordinates', () => {
    const moveObject = ai.computerTurn()

    expect(moveObject.x).toBeGreaterThanOrEqual(0)
    expect(moveObject.x).toBeLessThanOrEqual(10)
    expect(moveObject.y).toBeGreaterThanOrEqual(0)
    expect(moveObject.y).toBeLessThanOrEqual(10)
  })

  test('moves are integers', () => {
    const moveObject = ai.computerTurn()
    expect(Number.isInteger(moveObject.x)).toBe(true)
    expect(Number.isInteger(moveObject.y)).toBe(true)
  })
})

describe('tests for checkMove function', () => {
  beforeEach(() => {
    ai.moveList = [{x:1,y:1}]
  })

  test('check if false for move on already struck coordinates', () => {
    expect(ai.checkMove(1,1)).toBe(false)
  })
  test('check if true for not struck', () => {
    expect(ai.checkMove(1,2)).toBe(true)
  })

  test('check if true for not struck 2', () => {
    expect(ai.checkMove(2,1)).toBe(true)
  })
})

describe('computerTurn adds move to moveList', () => {
  
})

describe('clear move list function', () => {

})

describe('ai does not strike same place twice tests', () => {

})

