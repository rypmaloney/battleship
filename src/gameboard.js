import { node } from "webpack";
import ship from "./ship"

const gameboard = (player) => {
    const meta = {
        playerName: player,

    }

    let board = []
    for (let i = 0; i < 10; i ++){
        board.push([])
                for (let x = 0; x < 10; x ++){
                    board[i].push({
                        ship:false,
                        hit: false,
                    })
                    
                }
            }
    
    const getBoard = () => board;

    function placeShip(x, y, length){
        let newShip = ship(length)

        board[x][y].ship = true
    }


    return {
        getBoard, 
        meta,
        placeShip
            }
}

export default gameboard;   