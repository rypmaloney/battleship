import gameboard from '../gameboard'

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