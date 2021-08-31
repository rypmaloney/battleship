
const player = (name) => {
    let meta = {
        name: name,
        moves: [],
    }

    function randomMove(){
        let x =  Math.floor(Math.random() * 100);

        meta.moves.push(x)
        return x
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