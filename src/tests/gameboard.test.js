import gameboard from '../gameboard'

let player = "me"
let playerBoard = gameboard(player)
let board = playerBoard.getBoard()
test('Tests existence of board', () => {
    expect(board.length).toBe(10);
});
