import player from './player'
import gameboard from './gameboard'
import ship from './ship'

/* Steps:
    1. Initialize gameboard x
    2. Computer picks random ships
    3. Player places their ships:
        1.
    4. Turns begin. Each turn consits of:
        1. choosing spot runnign computerBoard.receive(spot)
        2. Switch turn

*/


function turn(e){
    computerGameboard.receiveAttack(parseInt(e.target.id))
    updateBoard(e)
}










const playerGameboard = gameboard('player')
const computerGameboard = gameboard('computer')

const computerDomBoard = document.getElementById('computer-board');
const playerDomBoard = document.getElementById('player-board');


function updateBoard(e){
    let index = e.target.id

    let cboard = computerGameboard.getBoard()
    let spot = document.getElementById(index)
    if(cboard[index].ship == true){spot.setAttribute('class', "ship")}
    if(cboard[index].hit == true){spot.setAttribute('class', "hit")}
    if(cboard[index].missedHit == true){spot.setAttribute('class', "miss")}
}




//two test ships
playerGameboard.placeShip(50, 4)
playerGameboard.placeShip(75, 2)
computerGameboard.placeShip(50, 4)
computerGameboard.placeShip(75, 2)
computerGameboard.placeShip(98, 5)
computerGameboard.placeShip(33, 2)

//testing hit and miss
playerGameboard.receiveAttack(40)
playerGameboard.receiveAttack(23)

function initializeBoard(){
    //Create computer board
    let cboard = computerGameboard.getBoard()
    for (let i=0 ; i < cboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot computer-spot")

        spot.addEventListener("click",(e)=> turn(e));

        computerDomBoard.appendChild(spot)
    }
    //create player board
    let pboard = playerGameboard.getBoard()
    for (let i=0 ; i < pboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot")
        if(pboard[i].ship == true){spot.setAttribute('class', "ship ")}
        if(pboard[i].hit == true){spot.setAttribute('class', "hit ")}
        if(pboard[i].missedHit == true){spot.setAttribute('class', "miss ")}
       
        playerDomBoard.appendChild(spot)
    }
    console.log(pboard)
}

export default initializeBoard;