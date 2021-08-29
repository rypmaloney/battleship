const ship = (length, x, y) => {
    let id = `${x}x${y}`
    let hits = [];
    const hit = (hitx, hity) => {
        hits.push({hitx, hity})
    };

    const isSunk = () => {
        if (hits.length == length){
            return true;
        } else {
            return false;
        }
    };

    return {hit, hits, length, isSunk, id}
}



export default ship;
