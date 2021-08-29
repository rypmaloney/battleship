import { node } from "webpack";
import ship from "./ship"

const gameboard = (player) => {
    //information about the gameboard
    const meta = {
        playerName: player,
        ships: [],
        missedHits: [],
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
                missedHit:false,
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

        meta.ships.push(ship(length,x,y))
        

        //only works for vertical ships 
        for(let i=0;i<length-1; i++){
            y-=1
            board[x][y].ship = true;
            board[x][y].id = id
        }
    }

    function receiveAttack(x,y){
        if(board[x][y].id != null){
            //find the id of the boat at that location in the meta.ships array
            let index = meta.ships.map(e => e.id).indexOf(board[x][y].id)

            //hit that boat at the location
            meta.ships[index].hit(x,y)
            
        }else{
            meta.missedHits.push([x, y])
            board[x][y].missedHit=true

        }
    }



    return {
        getBoard, 
        meta,
        placeShip,
        receiveAttack
            }
}

export default gameboard;   