import ship from "./ship";

const gameboard = (player) => {
    //information about the gameboard
    const meta = {
        playerName: player,
        ships: [],
        missedHits: [],
        hits: [],
        success: false,
    };
    //creation of the gameboard through looping
    let board = [];
    for (let x = 0; x < 100; x++) {
        board.push({
            ship: false,
            id: null,
            hit: false,
            missedHit: false,
        });
    }

    function checkForWinner() {
        if (meta.hits.length === 17) {
            return true;
        } else {
            return false;
        }
    }

    //Board giveth
    const getBoard = () => board;

    //
    function placeShip(spot, length, direction) {
        let id = `ship${spot}`;

        if (direction === "y") {
            if (spot - length * 10 < 0) {
                console.log("You cannot place a ship off the board");
            } else {
                board[spot].ship = true;
                board[spot].id = id;
                meta.ships.push(ship(length, spot));
                for (let i = 0; i < length - 1; i++) {
                    spot -= 10;
                    board[spot].ship = true;
                    board[spot].id = id;
                }
            }
        }
        if (direction === "x"){
            let goForX = true
            for (let i = 0; i < length - 1; i++){
                 spot += 1
                 if (spot % 10 === 0){
                    goForX = false;
                 }
            }
            if (goForX === true){
                board[spot].ship = true;
                board[spot].id = id;
                meta.ships.push(ship(length, spot));
                for (let i = 0; i < length - 1; i++) {
                    spot += 1;
                    board[spot].ship = true;
                    board[spot].id = id;
                }
            }else {
                console.log("you can't do that!")
            }
        
        }

    }

    function receiveAttack(spot) {
        if (board[spot].id != null) {
            //update the board
            board[spot].hit = true;
            meta.success = true;

            //find the id of the boat at that location in the meta.ships array
            let index = meta.ships.map((e) => e.id).indexOf(board[spot].id);

            //hit that boat at the location
            meta.ships[index].hit(spot);
            meta.hits.push(spot);
        } else {
            meta.success = false;
            meta.missedHits.push(spot);
            board[spot].missedHit = true;
        }
    }

    return {
        getBoard,
        meta,
        placeShip,
        receiveAttack,
        checkForWinner,
    };
};

export default gameboard;
