import ai from "../src/ai";

describe('tests for AI random moves', () => {
  beforeEach(() => {
    ai.clearMoveList();
  })

  test('ai returns random coordiantes', () => {
    expect(ai.computerTurn().x).toBeGreaterThanOrEqual()
  })
})