import { node } from "webpack";
import ship from "./ship"

const gameboard = (player) => {
    //information about the gameboard
    const meta = {
        playerName: player,
        ships: [],
    }
    //creation of the gameboard through looping; 10x10; use board[x][y] to reference a space
    let board = []
    for (let i = 0; i < 10; i ++){
        board.push([])
        for (let x = 0; x < 10; x ++){
            board[i].push({
                ship:false,
                id: null,
                hit: false,
            })
            
        }
    }
    //Board giveth
    const getBoard = () => board;

    //
    function placeShip(x, y, length){
        let id = `${x}x${y}`
        board[x][y].ship = true
        board[x][y].id = id

        //only works for vertical ships 
        for(let i=0;i<length-1; i++){
            x+=1
            board[x][y].ship = true;
            board[x][y].id = id
        }
    }

    function receiveAttack(x,y){
        if(board[x][y].id != null){
            
        }else{
            missedHits.push(board[x][y])
        }
    }

    let missedHits = []


    return {
        getBoard, 
        meta,
        placeShip
            }
}

export default gameboard;   