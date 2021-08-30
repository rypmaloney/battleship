
const player = (name) => {
    let meta = {
        name: name,
        moves: [],
    }

    function randomMove(){
        let x =  Math.floor(Math.random() * 9);
        let y =  Math.floor(Math.random() * 9);

        meta.moves.push([x,y])

        return [x,y]
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
    }
}

export default player;