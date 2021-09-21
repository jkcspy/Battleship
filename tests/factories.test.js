import shipFactory from "../src/factories";

describe('ship factory tests', () => {

  test('ship factory creates a ship of length 2 with hitBoard of 2', () => {
    expect(shipFactory(2)).toMatchObject({hitBoard:[0,0]});
  });

  test('ship factory creates a ship of length 3 with hitBoard of 3', () => {
    expect(shipFactory(3)).toMatchObject({hitBoard:[0,0,0]});
  });
});

describe('ship object: hit method tests', () => {
  const exampleShip = shipFactory(3);
  
  test('ship hit example 1', () => {
    expect(exampleShip.hit(1)).toBe()

  });
});

