import ai from "../src/ai";

describe('tests for AI random moves', () => {
  test('ai returns random coordiantes', () => {
    const moveObject = ai.computerTurn()

    expect(moveObject.x).toBeGreaterThanOrEqual(0)
    expect(moveObject.x).toBeLessThanOrEqual(10)
    expect(moveObject.y).toBeGreaterThanOrEqual(0)
    expect(moveObject.y).toBeLessThanOrEqual(10)
  })

  test('moves are integers', () => {
    const moveObject = ai.computerTurn()
    expect(Number.isInteger(moveObject.x)).toBe(true)
  })
})

