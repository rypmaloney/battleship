import { node } from "webpack";

const gameboard = (player) => {
    const meta = {
        playerName: player,

    }

    let board = Array(10).fill(null).map(() => Array(10).fill(
        {
            ship: false,
            hit: false,
        }
    ))
    const getBoard = () => board;


    return {
        getBoard, 
        meta
            }
}

export default gameboard;   