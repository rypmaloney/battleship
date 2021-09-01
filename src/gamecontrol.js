import player from './player'
import gameboard from './gameboard'
import ship from './ship'

function initializeBoard(){
const computerGameboard = gameboard('computer')
const compBoard = document.getElementById('computer-board');

let board = computerGameboard.getBoard()
console.log(board)

for (let i=0 ; i < board.length; i++){
    let spot = document.createElement('div');
    spot.setAttribute('id', i)
    compBoard.appendChild(spot)

}
}

export default initializeBoard;