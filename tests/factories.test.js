import{ shipFactory, gameBoardFactory } from "../src/factories";

describe('ship factory tests', () => {

  test('ship factory creates a ship of length 2 with hitBoard of 2', () => {
    expect(shipFactory(2)).toMatchObject({hitBoard: [0, 0]});
  });

  test('ship factory creates a ship of length 3 with hitBoard of 3', () => {
    expect(shipFactory(3)).toMatchObject({hitBoard: [0, 0, 0]});
  });
});

describe('ship object: hit method', () => {
  let exampleShip;

  beforeEach(()=>{
    exampleShip = shipFactory(3);
  })

  test('ship hit example 1', () => {
    expect(exampleShip.hit(1)).toStrictEqual([0, 1, 0])
  });
  test('ship hit example 2', () => {
    expect(exampleShip.hit(2)).toStrictEqual([0, 0, 1])
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

describe('gameBoard factory tests', () => {
  test('gameBoard factory creates a 10x10 gameboard', () => {
    const gameBoard = {gameBoard:new Array(100).fill('')};
    expect(gameBoardFactory()).toMatchObject(gameBoard);
  });
  test('gameBoard factory not equal to wrong array', () => {
    const gameBoard = {gameBoard: ['','']};
    expect(gameBoardFactory()).not.toMatchObject(gameBoard);
  });
});

describe('gameBoard place ship tests', () => {
  let exampleBoard;

  beforeEach(()=>{
    exampleBoard = gameBoardFactory();
  });

  test('place ship on board example 1', () => {
    exampleBoard.placeShip(1,1,1,'up');
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0]} });
  });
  test('place ship on board example 2', () => {
    exampleBoard.placeShip(2,1,1,'up');
    expect(exampleBoard.gameBoard[1]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0]} });
  });
  test('place ship on board example 3', () => {
    exampleBoard.placeShip(1,1,2,'right');
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0, 0]} });
    expect(exampleBoard.gameBoard[1]).toMatchObject({hitIndex: 1, isHit: false, ship: {hitBoard: [0, 0]} });
  });
  test('place ship on board example 3', () => {
    exampleBoard.placeShip(4,1,3,'down');
    expect(exampleBoard.gameBoard[3]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0, 0, 0]} });
    expect(exampleBoard.gameBoard[13]).toMatchObject({hitIndex: 1, isHit: false, ship: {hitBoard: [0, 0, 0]} });
    expect(exampleBoard.gameBoard[23]).toMatchObject({hitIndex: 2, isHit: false, ship: {hitBoard: [0, 0, 0]} });
  });
})

describe('gameBoard recieve attack tests', () => {
  let exampleBoard;

  beforeEach(()=>{
    exampleBoard = gameBoardFactory();
    exampleBoard.placeShip(1, 1, 3, 'down');
  });

  test('game board recieves attack on empty space ex.1', () => {
    exampleBoard.recieveAttack(5,5);
    expect(exampleBoard.gameBoard[44]).toBe('x');
  });
  test('game board recieves attack on empty space ex.2', () => {
    exampleBoard.recieveAttack(5,4);
    expect(exampleBoard.gameBoard[34]).toBe('x');
  });

  test('game board recieves attack on ship ex 1', () => {
    exampleBoard.recieveAttack(1,1);
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 0, 0]} });
  })
  test('game board recieves attack on ship ex 2', () => {
    exampleBoard.recieveAttack(1,3);
    expect(exampleBoard.gameBoard[20]).toMatchObject({hitIndex: 2, isHit: true, ship: {hitBoard: [0, 0, 1]} });
  })

  test('gameboard recieves many hits ex 1', () => {
    exampleBoard.recieveAttack(1,1);
    exampleBoard.recieveAttack(1,3);
    exampleBoard.recieveAttack(5,4);

    expect(exampleBoard.gameBoard[20]).toMatchObject({hitIndex: 2, isHit: true, ship: {hitBoard: [1, 0, 1]} });
    expect(exampleBoard.gameBoard[10]).toMatchObject({hitIndex: 1, isHit: false, ship: {hitBoard: [1, 0, 1]} });
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 0, 1]} });
    expect(exampleBoard.gameBoard[34]).toBe('x');
  })
})