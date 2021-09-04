/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



const gameboard = (player) => {
  //information about the gameboard
  const meta = {
    playerName: player,
    ships: [],
    missedHits: [],
  };
  //creation of the gameboard through looping; 10x10; use board[x][y] to reference a space
  let board = [];
    for (let x = 0; x < 100; x++) {
    board.push({
        ship: false,
        id: null,
        hit: false,
        missedHit: false,
        });
    }

  //Board giveth
  const getBoard = () => board;

  //
  function placeShip(spot, length, direction) {
    let id = `ship${spot}`;
    board[spot].ship = true;
    board[spot].id = id;

    meta.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length,spot));

    //only works for vertical ships
    if (direction === "y"){
      for (let i = 0; i < length - 1; i++) {
        spot -= 10;
        board[spot].ship = true;
        board[spot].id = id;
      }

    }
    //Horizontal ships
    if (direction === "x"){
      for (let i = 0; i < length - 1; i++) {
        spot += 1;
        board[spot].ship = true;
        board[spot].id = id;
      }

    }

    
  }

  function receiveAttack(spot) {
    if (board[spot].id != null) {
      //update the board
      board[spot].hit = true;

      //find the id of the boat at that location in the meta.ships array
      let index = meta.ships.map((e) => e.id).indexOf(board[spot].id);

      //hit that boat at the location
      meta.ships[index].hit(spot);
    } else {
      meta.missedHits.push(spot);
      board[spot].missedHit = true;
    }
  }

  return {
    getBoard,
    meta,
    placeShip,
    receiveAttack,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);


/***/ }),

/***/ "./src/gamecontrol.js":
/*!****************************!*\
  !*** ./src/gamecontrol.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");




/* Steps:
    1. Initialize gameboard x
    2. Computer picks random ships
    3. Player places their ships:
        1.
    4. Turns begin. Each turn consits of:
        1. choosing spot runnign computerBoard.receive(spot)
        2. Switch turn


To do: 
    1. Make ability to place ships horizontally
    2. create random placement for computer
    2. 
*/





let shipDirection = "y"

function rotateMyShips(){
    if (shipDirection == "y"){
        let ships = document.querySelectorAll(".display-vertical")
        console.log(ships)
        let rotatable = document.getElementById('rotatable')
        rotatable.setAttribute('class', 'rotatable-column')
        for(let i=0; i < ships.length; i ++){
            ships[i].setAttribute('class', 'display-horizontal') 
        }

        return shipDirection = "x"


    } else if (shipDirection == "x"){
            let ships = document.querySelectorAll('.display-horizontal')
            let rotatable = document.getElementById('rotatable')
            rotatable.setAttribute('class', 'rotatable-row')
            for(let i=0; i < ships.length; i ++){
                ships[i].setAttribute('class', 'ship-display display-vertical')
            }

            return shipDirection = "y"
    }
    

}







function playGame(){

    const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)('computer')
    const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)('human')
    const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)('player')
    const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)('computer')

    const computerDomBoard = document.getElementById('computer-board');
    const playerDomBoard = document.getElementById('player-board');



    //two test ships
    playerGameboard.placeShip(50, 4, 'x')
    playerGameboard.placeShip(75, 2, 'y')
    computerGameboard.placeShip(50, 4, 'x')
    initializeBoard()
        
    let turn = "player"
    function playerTurn(e, oppositionBoard){
        oppositionBoard.receiveAttack(parseInt(e.target.id))
        updateComputerBoard(e)
        switchTurn()
        computerTurn()
    }

    function switchTurn(){
        if(turn == "player"){
            return turn = "computer"
        }
    }

    function computerTurn(){
        let selection = computerPlayer.randomMove()

        playerGameboard.receiveAttack(selection)
        updatePlayerBoard(selection)
    }




    function initializeBoard(){
        //Create computer board
        let cboard = computerGameboard.getBoard()
        for (let i=0 ; i < cboard.length; i++){
            let spot = document.createElement('div');
            spot.setAttribute('id', i)
            spot.setAttribute('class', "spot computer-spot")
    
            spot.addEventListener("click",(e)=> playerTurn(e, computerGameboard));
    
            computerDomBoard.appendChild(spot)
        }
        //create player board
        let pboard = playerGameboard.getBoard()
        for (let i=0 ; i < pboard.length; i++){
            let spot = document.createElement('div');
            spot.setAttribute('id', `p${i}`)
            spot.setAttribute('class', "spot")
            if(pboard[i].ship == true){spot.setAttribute('class', "ship ")}
            if(pboard[i].hit == true){spot.setAttribute('class', "hit ")}
            if(pboard[i].missedHit == true){spot.setAttribute('class', "miss ")}
           
            playerDomBoard.appendChild(spot)
        }

    }





    function updateComputerBoard(e){
        let index = e.target.id
    
        let cboard = computerGameboard.getBoard()
        let cspot = document.getElementById(index)
        if(cboard[index].ship == true){cspot.setAttribute('class', "ship")}
        if(cboard[index].hit == true){cspot.setAttribute('class', "hit")}
        if(cboard[index].missedHit == true){cspot.setAttribute('class', "miss")}
    
    }
    
    function updatePlayerBoard(selection){
        let index = selection

        let pboard = playerGameboard.getBoard()
        console.log(pboard[index])
        let pspot = document.getElementById(`p${index}`)
        if(pboard[index].ship == true){pspot.setAttribute('class', "ship")}
        if(pboard[index].hit == true){pspot.setAttribute('class', "hit")}
        if(pboard[index].missedHit == true){pspot.setAttribute('class', "miss")}
    }



    const rotateBtn = document.getElementById('rotate')
    rotateBtn.addEventListener('click', () => rotateMyShips())
}















/*

//two test ships
playerGameboard.placeShip(50, 4, 'x')
playerGameboard.placeShip(75, 2, 'y')
computerGameboard.placeShip(50, 4, 'x')


//testing hit and miss
playerGameboard.receiveAttack(40)
playerGameboard.receiveAttack(23)

function initializeBoard(){
    //Create computer board
    let cboard = computerGameboard.getBoard()
    for (let i=0 ; i < cboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot computer-spot")

        spot.addEventListener("click",(e)=> playerTurn(e, computerGameboard));

        computerDomBoard.appendChild(spot)
    }
    //create player board
    let pboard = playerGameboard.getBoard()
    for (let i=0 ; i < pboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot")
        if(pboard[i].ship == true){spot.setAttribute('class', "ship ")}
        if(pboard[i].hit == true){spot.setAttribute('class', "hit ")}
        if(pboard[i].missedHit == true){spot.setAttribute('class', "miss ")}
       
        playerDomBoard.appendChild(spot)
    }
    console.log(pboard)
}
*/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playGame);

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const player = (name) => {
    let meta = {
        name: name,
        moves: [],
    }

    
    
    
    function turn(spot){

        
    }

    function randomMove(){
        let x =  Math.floor(Math.random() * 100);

        for (let i=0 ; i < meta.moves.length; i ++){
           if(x === meta.moves[i]){
                x =  Math.floor(Math.random() * 100);
           }
        }
           

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






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ship = (length, spot) => {
    let id = `ship${spot}`
    let hits = [];
    const hit = (hitLocation) => {
        hits.push({
            hitLocation
        })
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ship);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _gamecontrol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gamecontrol */ "./src/gamecontrol.js");
console.log('If you see me...')

;






(0,_gamecontrol__WEBPACK_IMPORTED_MODULE_3__.default)()





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0EsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUMvQ3JCO0FBQ0Esb0JBQW9CLEtBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7Ozs7QUFJQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUN0QnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQSxDQUEwQjtBQUNJO0FBQ007QUFDTztBQUNOOzs7QUFHckMscURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgc2hpcHM6IFtdLFxuICAgIG1pc3NlZEhpdHM6IFtdLFxuICB9O1xuICAvL2NyZWF0aW9uIG9mIHRoZSBnYW1lYm9hcmQgdGhyb3VnaCBsb29waW5nOyAxMHgxMDsgdXNlIGJvYXJkW3hdW3ldIHRvIHJlZmVyZW5jZSBhIHNwYWNlXG4gIGxldCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgLy9Cb2FyZCBnaXZldGhcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvL1xuICBmdW5jdGlvbiBwbGFjZVNoaXAoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG5cbiAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsc3BvdCkpO1xuXG4gICAgLy9vbmx5IHdvcmtzIGZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKXtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vSG9yaXpvbnRhbCBzaGlwc1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKXtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soc3BvdCkge1xuICAgIGlmIChib2FyZFtzcG90XS5pZCAhPSBudWxsKSB7XG4gICAgICAvL3VwZGF0ZSB0aGUgYm9hcmRcbiAgICAgIGJvYXJkW3Nwb3RdLmhpdCA9IHRydWU7XG5cbiAgICAgIC8vZmluZCB0aGUgaWQgb2YgdGhlIGJvYXQgYXQgdGhhdCBsb2NhdGlvbiBpbiB0aGUgbWV0YS5zaGlwcyBhcnJheVxuICAgICAgbGV0IGluZGV4ID0gbWV0YS5zaGlwcy5tYXAoKGUpID0+IGUuaWQpLmluZGV4T2YoYm9hcmRbc3BvdF0uaWQpO1xuXG4gICAgICAvL2hpdCB0aGF0IGJvYXQgYXQgdGhlIGxvY2F0aW9uXG4gICAgICBtZXRhLnNoaXBzW2luZGV4XS5oaXQoc3BvdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGEubWlzc2VkSGl0cy5wdXNoKHNwb3QpO1xuICAgICAgYm9hcmRbc3BvdF0ubWlzc2VkSGl0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkLFxuICAgIG1ldGEsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJ1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCBzaGlwIGZyb20gJy4vc2hpcCdcblxuLyogU3RlcHM6XG4gICAgMS4gSW5pdGlhbGl6ZSBnYW1lYm9hcmQgeFxuICAgIDIuIENvbXB1dGVyIHBpY2tzIHJhbmRvbSBzaGlwc1xuICAgIDMuIFBsYXllciBwbGFjZXMgdGhlaXIgc2hpcHM6XG4gICAgICAgIDEuXG4gICAgNC4gVHVybnMgYmVnaW4uIEVhY2ggdHVybiBjb25zaXRzIG9mOlxuICAgICAgICAxLiBjaG9vc2luZyBzcG90IHJ1bm5pZ24gY29tcHV0ZXJCb2FyZC5yZWNlaXZlKHNwb3QpXG4gICAgICAgIDIuIFN3aXRjaCB0dXJuXG5cblxuVG8gZG86IFxuICAgIDEuIE1ha2UgYWJpbGl0eSB0byBwbGFjZSBzaGlwcyBob3Jpem9udGFsbHlcbiAgICAyLiBjcmVhdGUgcmFuZG9tIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcbiAgICAyLiBcbiovXG5cblxuXG5cblxubGV0IHNoaXBEaXJlY3Rpb24gPSBcInlcIlxuXG5mdW5jdGlvbiByb3RhdGVNeVNoaXBzKCl7XG4gICAgaWYgKHNoaXBEaXJlY3Rpb24gPT0gXCJ5XCIpe1xuICAgICAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXktdmVydGljYWxcIilcbiAgICAgICAgY29uc29sZS5sb2coc2hpcHMpXG4gICAgICAgIGxldCByb3RhdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRhYmxlJylcbiAgICAgICAgcm90YXRhYmxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncm90YXRhYmxlLWNvbHVtbicpXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgc2hpcHMubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGlzcGxheS1ob3Jpem9udGFsJykgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2hpcERpcmVjdGlvbiA9IFwieFwiXG5cblxuICAgIH0gZWxzZSBpZiAoc2hpcERpcmVjdGlvbiA9PSBcInhcIil7XG4gICAgICAgICAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGlzcGxheS1ob3Jpem9udGFsJylcbiAgICAgICAgICAgIGxldCByb3RhdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRhYmxlJylcbiAgICAgICAgICAgIHJvdGF0YWJsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3JvdGF0YWJsZS1yb3cnKVxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCBzaGlwcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2hpcC1kaXNwbGF5IGRpc3BsYXktdmVydGljYWwnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2hpcERpcmVjdGlvbiA9IFwieVwiXG4gICAgfVxuICAgIFxuXG59XG5cblxuXG5cblxuXG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCl7XG5cbiAgICBjb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcignY29tcHV0ZXInKVxuICAgIGNvbnN0IGh1bWFuUGxheWVyID0gcGxheWVyKCdodW1hbicpXG4gICAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCdwbGF5ZXInKVxuICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCdjb21wdXRlcicpXG5cbiAgICBjb25zdCBjb21wdXRlckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLWJvYXJkJyk7XG4gICAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJyk7XG5cblxuXG4gICAgLy90d28gdGVzdCBzaGlwc1xuICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDQsICd4JylcbiAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDc1LCAyLCAneScpXG4gICAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCAneCcpXG4gICAgaW5pdGlhbGl6ZUJvYXJkKClcbiAgICAgICAgXG4gICAgbGV0IHR1cm4gPSBcInBsYXllclwiXG4gICAgZnVuY3Rpb24gcGxheWVyVHVybihlLCBvcHBvc2l0aW9uQm9hcmQpe1xuICAgICAgICBvcHBvc2l0aW9uQm9hcmQucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5pZCkpXG4gICAgICAgIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSlcbiAgICAgICAgc3dpdGNoVHVybigpXG4gICAgICAgIGNvbXB1dGVyVHVybigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3dpdGNoVHVybigpe1xuICAgICAgICBpZih0dXJuID09IFwicGxheWVyXCIpe1xuICAgICAgICAgICAgcmV0dXJuIHR1cm4gPSBcImNvbXB1dGVyXCJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVyVHVybigpe1xuICAgICAgICBsZXQgc2VsZWN0aW9uID0gY29tcHV0ZXJQbGF5ZXIucmFuZG9tTW92ZSgpXG5cbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soc2VsZWN0aW9uKVxuICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pXG4gICAgfVxuXG5cblxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCl7XG4gICAgICAgIC8vQ3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICAgIGZvciAobGV0IGk9MCA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKVxuICAgIFxuICAgICAgICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PiBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKSk7XG4gICAgXG4gICAgICAgICAgICBjb21wdXRlckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpXG4gICAgICAgIH1cbiAgICAgICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgcGJvYXJkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnaWQnLCBgcCR7aX1gKVxuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzcG90XCIpXG4gICAgICAgICAgICBpZihwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXAgXCIpfVxuICAgICAgICAgICAgaWYocGJvYXJkW2ldLmhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcImhpdCBcIil9XG4gICAgICAgICAgICBpZihwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwibWlzcyBcIil9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcGxheWVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cblxuXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wdXRlckJvYXJkKGUpe1xuICAgICAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5pZFxuICAgIFxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgICAgICBsZXQgY3Nwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleClcbiAgICAgICAgaWYoY2JvYXJkW2luZGV4XS5zaGlwID09IHRydWUpe2NzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXBcIil9XG4gICAgICAgIGlmKGNib2FyZFtpbmRleF0uaGl0ID09IHRydWUpe2NzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcImhpdFwiKX1cbiAgICAgICAgaWYoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSl7Y3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwibWlzc1wiKX1cbiAgICBcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheWVyQm9hcmQoc2VsZWN0aW9uKXtcbiAgICAgICAgbGV0IGluZGV4ID0gc2VsZWN0aW9uXG5cbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICAgIGNvbnNvbGUubG9nKHBib2FyZFtpbmRleF0pXG4gICAgICAgIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKVxuICAgICAgICBpZihwYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSl7cHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic2hpcFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSl7cHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0XCIpfVxuICAgICAgICBpZihwYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKXtwc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJtaXNzXCIpfVxuICAgIH1cblxuXG5cbiAgICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90YXRlJylcbiAgICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByb3RhdGVNeVNoaXBzKCkpXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vKlxuXG4vL3R3byB0ZXN0IHNoaXBzXG5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCAneCcpXG5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDc1LCAyLCAneScpXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDQsICd4JylcblxuXG4vL3Rlc3RpbmcgaGl0IGFuZCBtaXNzXG5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayg0MClcbnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKDIzKVxuXG5mdW5jdGlvbiBpbml0aWFsaXplQm9hcmQoKXtcbiAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IGNib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdCBjb21wdXRlci1zcG90XCIpXG5cbiAgICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PiBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKSk7XG5cbiAgICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgIH1cbiAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICBsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICBmb3IgKGxldCBpPTAgOyBpIDwgcGJvYXJkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2lkJywgaSlcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzcG90XCIpXG4gICAgICAgIGlmKHBib2FyZFtpXS5zaGlwID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic2hpcCBcIil9XG4gICAgICAgIGlmKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSl7c3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJoaXQgXCIpfVxuICAgICAgICBpZihwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwibWlzcyBcIil9XG4gICAgICAgXG4gICAgICAgIHBsYXllckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHBib2FyZClcbn1cbiovXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTsiLCJcbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICBmdW5jdGlvbiB0dXJuKHNwb3Qpe1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcbiAgICAgICAgbGV0IHggPSAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcblxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgbWV0YS5tb3Zlcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICBpZih4ID09PSBtZXRhLm1vdmVzW2ldKXtcbiAgICAgICAgICAgICAgICB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICBcblxuICAgICAgICBtZXRhLm1vdmVzLnB1c2goeClcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZUJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCJcbmltcG9ydCBwbGF5R2FtZSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9