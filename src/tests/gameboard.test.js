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

playerBoard.placeShip(4,3,4)
test('confirms placement of 4 square vertical ship', () => {
    expect(board[4][3].ship).toBe(true);
});
test('confirms placement of 4 square vertical ship partb', () => {
    expect(board[5][3].ship).toBe(true);
});
test('confirms placement of 4 square vertical ship part c', () => {
    expect(board[6][3].ship).toBe(true);
});
test('confirms placement of 4 square vertical ship part d', () => {
    expect(board[7][3].ship).toBe(true);
});

test('confirms id is present', () => {
    expect(board[7][3].id).toBe('4x3');
});