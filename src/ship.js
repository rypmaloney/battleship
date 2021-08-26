const ship = (length) => {
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
    return {hit, hits, length}
}



export default ship;
