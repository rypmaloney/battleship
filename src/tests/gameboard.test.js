import gameboard from '../gameboard'
import ship from '../ship'

let player = "me"
let playerBoard = gameboard(player)
let board = playerBoard.getBoard()
test('Tests existence of board', () => {
    expect(board.length).toBe(10);
});

playerBoard.placeShip(2,3,1)
test('Tests existence of ship on board', () => {
    expect(board[2][3].ship).toBe(true);
});

playerBoard.placeShip(2,3,1)
test('confirms existence of ship on board', () => {
    expect(board[2][4].ship).toBe(false);
});

playerBoard.placeShip(4,3,3)
test('confirms placement of 4 square vertical ship', () => {
    expect(board[4][3].ship).toBe(true);
});
test('confirms placement of 4 square vertical ship partb', () => {
    expect(board[4][2].ship).toBe(true);
});

test('confirms id is present', () => {
    expect(board[4][1].id).toBe('4x3');
});

let samplePlayerShip = ship(3,3,3)
let samplePlayerBoard = gameboard(player)
samplePlayerBoard.meta.ships.push(samplePlayerShip)


test('confirms ship manifest logs information', () => {
    expect(samplePlayerBoard.meta.ships.length).toBe(1);
});


let  newPlayerBoard = gameboard(player)
let ship1 = ship(3,3,3)
newPlayerBoard.placeShip(3,3,3)
let ship2 = ship(5,7,2)
newPlayerBoard.placeShip(5,7,2)

newPlayerBoard.receiveAttack(3,3)


test('confirms receive attack logs hit on appropriate ship', () => {
    expect(newPlayerBoard.meta.ships[0].hits.length).toBe(1);
});
/*
newPlayerBoard.receiveAttack(3,2)
newPlayerBoard.receiveAttack(3,1)

test('confirms sinking of a ship', () => {
    expect(newPlayerBoard.meta.ships[0].isSunk()).toBe(true);
});
*/