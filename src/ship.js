const ship = (length) => {
    let shipArray = []
    let hits = [];
    const hit = hitLocation => {
        hits.push(hitLocation)
    };

    const isSunk = () => {
        if (hits.length == length){
            return true;
        } else {
            return false;
        }
    };
    return {hit, hits, length, isSunk}
}



export default ship;
