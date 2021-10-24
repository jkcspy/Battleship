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
  test('check one move added to list', ()=>{
    ai.computerTurn()
    expect(ai.moveList.length).toBe(1)
  })

  test('check 2 moves added to list', () => {
    ai.computerTurn()
    ai.computerTurn()
    expect(ai.moveList.length).toBe(2)
  } )

})

describe('clear move list function', () => {
  beforeEach(()=> {
    ai.moveList = [{x:1,y:1},{x:3,y:3}]
  })

  test('check if clearMoveList clears moveList', () => {
    ai.clearMoveList()
    expect(ai.moveList).toEqual([])
  })

  test('check if not cleared when no function call', () => {
    expect(ai.moveList).toEqual([{x:1,y:1},{x:3,y:3}])
  })
})
