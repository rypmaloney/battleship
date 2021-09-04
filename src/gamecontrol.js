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


To do: 
    1. Make ability to place ships horizontally
    2. create random placement for computer
    2. 
*/





let shipDirection = "y"

function rotateMyShips(){
    if (shipDirection == "y"){
        let ships = document.querySelectorAll(".display-vertical")
        console.log(ships)
        let rotatable = document.getElementById('rotatable')
        rotatable.setAttribute('class', 'rotatable-column')
        for(let i=0; i < ships.length; i ++){
            ships[i].setAttribute('class', 'display-horizontal') 
        }

        return shipDirection = "x"


    } else if (shipDirection == "x"){
            let ships = document.querySelectorAll('.display-horizontal')
            let rotatable = document.getElementById('rotatable')
            rotatable.setAttribute('class', 'rotatable-row')
            for(let i=0; i < ships.length; i ++){
                ships[i].setAttribute('class', 'ship-display display-vertical')
            }

            return shipDirection = "y"
    }
    

}







function playGame(){

    const computerPlayer = player('computer')
    const humanPlayer = player('human')
    const playerGameboard = gameboard('player')
    const computerGameboard = gameboard('computer')

    const computerDomBoard = document.getElementById('computer-board');
    const playerDomBoard = document.getElementById('player-board');



    //two test ships
    playerGameboard.placeShip(50, 4, 'x')
    playerGameboard.placeShip(75, 2, 'y')
    computerGameboard.placeShip(50, 4, 'x')
    initializeBoard()
        
    let turn = "player"
    function playerTurn(e, oppositionBoard){
        oppositionBoard.receiveAttack(parseInt(e.target.id))
        updateComputerBoard(e)
        switchTurn()
        computerTurn()
    }

    function switchTurn(){
        if(turn == "player"){
            return turn = "computer"
        }
    }

    function computerTurn(){
        let selection = computerPlayer.randomMove()

        playerGameboard.receiveAttack(selection)
        updatePlayerBoard(selection)
    }




    function initializeBoard(){
        //Create computer board
        let cboard = computerGameboard.getBoard()
        for (let i=0 ; i < cboard.length; i++){
            let spot = document.createElement('div');
            spot.setAttribute('id', i)
            spot.setAttribute('class', "spot computer-spot")
    
            spot.addEventListener("click",(e)=> playerTurn(e, computerGameboard));
    
            computerDomBoard.appendChild(spot)
        }
        //create player board
        let pboard = playerGameboard.getBoard()
        for (let i=0 ; i < pboard.length; i++){
            let spot = document.createElement('div');
            spot.setAttribute('id', `p${i}`)
            spot.setAttribute('class', "spot")
            if(pboard[i].ship == true){spot.setAttribute('class', "ship ")}
            if(pboard[i].hit == true){spot.setAttribute('class', "hit ")}
            if(pboard[i].missedHit == true){spot.setAttribute('class', "miss ")}
           
            playerDomBoard.appendChild(spot)
        }

    }





    function updateComputerBoard(e){
        let index = e.target.id
    
        let cboard = computerGameboard.getBoard()
        let cspot = document.getElementById(index)
        if(cboard[index].ship == true){cspot.setAttribute('class', "ship")}
        if(cboard[index].hit == true){cspot.setAttribute('class', "hit")}
        if(cboard[index].missedHit == true){cspot.setAttribute('class', "miss")}
    
    }
    
    function updatePlayerBoard(selection){
        let index = selection

        let pboard = playerGameboard.getBoard()
        console.log(pboard[index])
        let pspot = document.getElementById(`p${index}`)
        if(pboard[index].ship == true){pspot.setAttribute('class', "ship")}
        if(pboard[index].hit == true){pspot.setAttribute('class', "hit")}
        if(pboard[index].missedHit == true){pspot.setAttribute('class', "miss")}
    }



    const rotateBtn = document.getElementById('rotate')
    rotateBtn.addEventListener('click', () => rotateMyShips())
}















/*

//two test ships
playerGameboard.placeShip(50, 4, 'x')
playerGameboard.placeShip(75, 2, 'y')
computerGameboard.placeShip(50, 4, 'x')


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

        spot.addEventListener("click",(e)=> playerTurn(e, computerGameboard));

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
*/
export default playGame;