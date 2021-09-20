import shipFactory from "../src/factories";

test('ship factory creates a ship of length 2 with hitBoard of 2', () => {
  const ship = {hitboard:[0,0]};
  expect(shipFactory(2)).toMatchObject(ship);
})