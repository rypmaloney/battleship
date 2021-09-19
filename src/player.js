import computerGameboard from "./gamecontrol";
import gameboard from "./gameboard";

const player = (name) => {
    let meta = {
        name: name,
        moves: [],
    };

    function makeRandomArray(number) {
        let array = [];
        for (let i = 0; i < number; i++) {
           array.push(i);
        }
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(array);
        return array
    }


    let moveArray = makeRandomArray(100);
    let turnNumber = 0;

    function randomMove() {
        let currentTurn = turnNumber;
        turnNumber += 1;

        return moveArray[currentTurn];
    }

    /*
    const AI = () => {
        function randomMove(){

        }
    }
    */

    return {
        meta,
        randomMove,
        makeRandomArray,
    };
};

export default player;
