import player from './player'
import gameboard from './gameboard'
import ship from './ship'

function initializeBoard(){
    //Create computer board
    const computerGameboard = gameboard('computer')
    const computerDomBoard = document.getElementById('computer-board');
    let cboard = computerGameboard.getBoard()
    for (let i=0 ; i < cboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot")
        computerDomBoard.appendChild(spot)
    }
    //create player board
    const playerGameboard = gameboard('player')
    const playerDomBoard = document.getElementById('player-board');
    let pboard = playerGameboard.getBoard()
    for (let i=0 ; i < pboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot")
       
    }
}

export default initializeBoard;