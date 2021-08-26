const ship = (length) => {
    hits: [],
    function hit(hitLocation){
        hits.push(hitLocation)
    };

    function isSunk(){
        if (hits.length == length){
            return true;
        } else {
            return false;
        }
    };
    return {hit, hits}
}


export default ship;