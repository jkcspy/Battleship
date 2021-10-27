import {coordinateTranslate, arrayTranslate } from "../src/utils";

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

describe('arrayTranslate tests', () => {
  test('example 1', () => {
    expect(arrayTranslate(0)).toEqual({x:1, y:1})
  })
  test('example 2', () => {
    expect(arrayTranslate(99)).toEqual({x:10, y:10})
  })
  test('example 3', () => {
    expect(arrayTranslate(9)).toEqual({x:10, y:1})
  })
})