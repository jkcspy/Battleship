import{ shipFactory, gameBoardFactory, playerFactory } from "../src/factories";

describe('ship factory tests', () => {

  test('ship factory creates a ship of length 2 with hitBoard of 2', () => {
    expect(shipFactory(2)).toMatchObject({hitBoard: [0, 0], sunk: [false]});
  });

  test('ship factory creates a ship of length 3 with hitBoard of 3', () => {
    expect(shipFactory(3)).toMatchObject({hitBoard: [0, 0, 0], sunk: [false]});
  });
});

describe('ship object: hit method', () => {
  let exampleShip;

  beforeEach(()=>{
    exampleShip = shipFactory(3);
  })

  test('ship hit example 1', () => {
    exampleShip.hit(1);
    expect(exampleShip.hitBoard).toStrictEqual([0, 1, 0]);
  });
  test('ship hit example 2', () => {
    exampleShip.hit(2);
    expect(exampleShip.hitBoard).toStrictEqual([0, 0, 1]);
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
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0], sunk: [false]} });
  });
  test('place ship on board example 2', () => {
    exampleBoard.placeShip(2,1,1,'up');
    expect(exampleBoard.gameBoard[1]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0], sunk: [false]} });
  });
  test('place ship on board example 3', () => {
    exampleBoard.placeShip(1,1,2,'right');
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[1]).toMatchObject({hitIndex: 1, isHit: false, ship: {hitBoard: [0, 0], sunk: [false]} });
  });
  test('place ship on board example 3', () => {
    exampleBoard.placeShip(4,1,3,'down');
    expect(exampleBoard.gameBoard[3]).toMatchObject({hitIndex: 0, isHit: false, ship: {hitBoard: [0, 0, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[13]).toMatchObject({hitIndex: 1, isHit: false, ship: {hitBoard: [0, 0, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[23]).toMatchObject({hitIndex: 2, isHit: false, ship: {hitBoard: [0, 0, 0], sunk: [false]} });
  });
})

describe('gameBoard receive attack tests', () => {
  let exampleBoard;

  beforeEach(()=>{
    exampleBoard = gameBoardFactory();
    exampleBoard.placeShip(1, 1, 3, 'down');
  });

  test('game board receives attack on empty space ex.1', () => {
    exampleBoard.receiveAttack(5,5);
    expect(exampleBoard.gameBoard[44]).toBe('x');
  });
  test('game board receives attack on empty space ex.2', () => {
    exampleBoard.receiveAttack(5,4);
    expect(exampleBoard.gameBoard[34]).toBe('x');
  });

  test('game board receives attack on ship ex 1', () => {
    exampleBoard.receiveAttack(1,1);
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 0, 0], sunk: [false]} });
  })
  test('game board receives attack on ship ex 2', () => {
    exampleBoard.receiveAttack(1,3);
    expect(exampleBoard.gameBoard[20]).toMatchObject({hitIndex: 2, isHit: true, ship: {hitBoard: [0, 0, 1], sunk: [false]} });
  })

  test('gameboard receives many hits ex 1 ship sunk', () => {
    exampleBoard.receiveAttack(1,1);
    exampleBoard.receiveAttack(1,3);
    exampleBoard.receiveAttack(5,4);
    exampleBoard.receiveAttack(1,2);

    expect(exampleBoard.gameBoard[20]).toMatchObject({hitIndex: 2, isHit: true, ship: {hitBoard: [1, 1, 1], sunk: [true]} });
    expect(exampleBoard.gameBoard[10]).toMatchObject({hitIndex: 1, isHit: true, ship: {hitBoard: [1, 1, 1], sunk: [true]} });
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 1, 1], sunk: [true]} });
    expect(exampleBoard.gameBoard[34]).toBe('x');
  })
  test('gameboard receives many hits ex 2 ship not sunk', () => {
    exampleBoard.receiveAttack(1,1);
    exampleBoard.receiveAttack(5,4);
    exampleBoard.receiveAttack(1,2);

    expect(exampleBoard.gameBoard[20]).toMatchObject({hitIndex: 2, isHit: false, ship: {hitBoard: [1, 1, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[10]).toMatchObject({hitIndex: 1, isHit: true, ship: {hitBoard: [1, 1, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 1, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[34]).toBe('x');
  })
})

describe('check if all ships on board sunk tests', () => {
  let exampleBoard;

  beforeEach(()=>{
    exampleBoard = gameBoardFactory();
    exampleBoard.placeShip(1, 1, 3, 'down');
    exampleBoard.placeShip(5, 5, 1, 'down');
  });

  test('all ships not sunk 1' , () =>{
    expect(exampleBoard.checkAllSunk()).toBe(false)
  })
  test('all ships not sunk 2', () =>{
    exampleBoard.receiveAttack(5,5);
    exampleBoard.receiveAttack(1,1);
    exampleBoard.receiveAttack(1,3);

    expect(exampleBoard.checkAllSunk()).toBe(false)
  })

  test('all ships sunk 1', () =>{
    exampleBoard.receiveAttack(5,5);
    exampleBoard.receiveAttack(1,1);
    exampleBoard.receiveAttack(1,2);
    exampleBoard.receiveAttack(1,3);

    expect(exampleBoard.checkAllSunk()).toBe(true)
  })

  test('all ships sunk with extra missing attacks', () =>{
    exampleBoard.receiveAttack(5,5);
    exampleBoard.receiveAttack(1,1);
    exampleBoard.receiveAttack(1,2);
    exampleBoard.receiveAttack(1,3);
    exampleBoard.receiveAttack(10,9);
    exampleBoard.receiveAttack(9,7);

    expect(exampleBoard.checkAllSunk()).toBe(true)
  })

  test('all ships not sunk with extra missing attacks', () =>{
    exampleBoard.receiveAttack(1,1);
    exampleBoard.receiveAttack(1,2);
    exampleBoard.receiveAttack(1,3);
    exampleBoard.receiveAttack(10,9);
    exampleBoard.receiveAttack(9,7);

    expect(exampleBoard.checkAllSunk()).toBe(false)
  })
})

describe('player factory creates player test', () => {
  test('player factory creates player 1', () => {
    expect(playerFactory('player 1')).toMatchObject({name: 'player 1'})
  });
  test('player factory creates player 2', () => {
    expect(playerFactory('player 2')).toMatchObject({name: 'player 2'})
  })
});

describe('player factory attack gameboard method tests', () => {
  let exampleBoard;
  let player = playerFactory('player');

  beforeEach(()=>{
    exampleBoard = gameBoardFactory();
    exampleBoard.placeShip(1, 1, 3, 'down');
    exampleBoard.placeShip(5, 5, 1, 'down');
  });

  test('attack method works on empty cell', () => {
    player.attack(3,3, exampleBoard);

    expect(exampleBoard.gameBoard[22]).toBe('x');
  })

  test('attack method works on ship cell', () => {
    player.attack(1,1, exampleBoard);

    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 0, 0], sunk: [false]} });
  })

  test('attack method many hits ship not sunk', () => {
    player.attack(1,1,exampleBoard);
    player.attack(5,4, exampleBoard);
    player.attack(1,2, exampleBoard);

    expect(exampleBoard.gameBoard[20]).toMatchObject({hitIndex: 2, isHit: false, ship: {hitBoard: [1, 1, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[10]).toMatchObject({hitIndex: 1, isHit: true, ship: {hitBoard: [1, 1, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[0]).toMatchObject({hitIndex: 0, isHit: true, ship: {hitBoard: [1, 1, 0], sunk: [false]} });
    expect(exampleBoard.gameBoard[34]).toBe('x');
  });
})