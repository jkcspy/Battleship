import shipFactory from "../src/factories";

describe('ship factory tests', () => {

  test('ship factory creates a ship of length 2 with hitBoard of 2', () => {
    expect(shipFactory(2)).toMatchObject({hitBoard:[0,0]});
  });

  test('ship factory creates a ship of length 3 with hitBoard of 3', () => {
    expect(shipFactory(3)).toMatchObject({hitBoard:[0,0,0]});
  });
});

describe('ship object: hit method', () => {
  let exampleShip;

  beforeEach(()=>{
    exampleShip = shipFactory(3);
  })

  test('ship hit example 1', () => {
    expect(exampleShip.hit(1)).toStrictEqual([0,1,0])
  });
  test('ship hit example 2', () => {
    expect(exampleShip.hit(2)).toStrictEqual([0,0,1])
  });
});

describe('ship object:isSunk method', () => {
  let exampleShip;

  beforeEach(()=>{
    exampleShip = shipFactory(3);
  })

  test('Ship not sunk example 1', () => {
    exampleShip.hit(1);
    exampleShip.hit(2);
    expect(exampleShip.isSunk()).toBe(false)
  });

  test('Ship sunk example 1', () => {
    exampleShip.hit(0);
    exampleShip.hit(1);
    exampleShip.hit(2);
    expect(exampleShip.isSunk()).toBe(true)
  });

  test('Ship not sunk example 2', () => {
    expect(exampleShip.isSunk()).toBe(false)
  });
});

