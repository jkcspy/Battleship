import coordinateTranslate from "../src/utils";

describe('coordinate translate tests', () => {
  test('example 1', () => {
    expect(coordinateTranslate(1,1)).toBe(0)
  })
  test('example 2', () => {
    expect(coordinateTranslate(10,10)).toBe(99)
  })
  test('example 3', () => {
    expect(coordinateTranslate(5,1)).toBe(4)
  })
})