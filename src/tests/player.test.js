import player from '../player'
import gameboard from '../gameboard'

let playerBoard = gameboard('computer');
let computer = player('computer')
let move = computer.randomMove()
playerBoard.receiveAttack(move[0], move[1])

test("tests random move generation", () => {
    expect(computer.meta.moves.length).toBe(1);
  });