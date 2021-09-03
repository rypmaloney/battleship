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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ1o7Ozs7QUFJQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUN0QnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQSxDQUEwQjtBQUNJO0FBQ007QUFDTztBQUNOOzs7QUFHckMscURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgc2hpcHM6IFtdLFxuICAgIG1pc3NlZEhpdHM6IFtdLFxuICB9O1xuICAvL2NyZWF0aW9uIG9mIHRoZSBnYW1lYm9hcmQgdGhyb3VnaCBsb29waW5nOyAxMHgxMDsgdXNlIGJvYXJkW3hdW3ldIHRvIHJlZmVyZW5jZSBhIHNwYWNlXG4gIGxldCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgLy9Cb2FyZCBnaXZldGhcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvL1xuICBmdW5jdGlvbiBwbGFjZVNoaXAoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG5cbiAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsc3BvdCkpO1xuXG4gICAgLy9vbmx5IHdvcmtzIGZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKXtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vSG9yaXpvbnRhbCBzaGlwc1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKXtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soc3BvdCkge1xuICAgIGlmIChib2FyZFtzcG90XS5pZCAhPSBudWxsKSB7XG4gICAgICAvL3VwZGF0ZSB0aGUgYm9hcmRcbiAgICAgIGJvYXJkW3Nwb3RdLmhpdCA9IHRydWU7XG5cbiAgICAgIC8vZmluZCB0aGUgaWQgb2YgdGhlIGJvYXQgYXQgdGhhdCBsb2NhdGlvbiBpbiB0aGUgbWV0YS5zaGlwcyBhcnJheVxuICAgICAgbGV0IGluZGV4ID0gbWV0YS5zaGlwcy5tYXAoKGUpID0+IGUuaWQpLmluZGV4T2YoYm9hcmRbc3BvdF0uaWQpO1xuXG4gICAgICAvL2hpdCB0aGF0IGJvYXQgYXQgdGhlIGxvY2F0aW9uXG4gICAgICBtZXRhLnNoaXBzW2luZGV4XS5oaXQoc3BvdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGEubWlzc2VkSGl0cy5wdXNoKHNwb3QpO1xuICAgICAgYm9hcmRbc3BvdF0ubWlzc2VkSGl0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkLFxuICAgIG1ldGEsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJ1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCBzaGlwIGZyb20gJy4vc2hpcCdcblxuLyogU3RlcHM6XG4gICAgMS4gSW5pdGlhbGl6ZSBnYW1lYm9hcmQgeFxuICAgIDIuIENvbXB1dGVyIHBpY2tzIHJhbmRvbSBzaGlwc1xuICAgIDMuIFBsYXllciBwbGFjZXMgdGhlaXIgc2hpcHM6XG4gICAgICAgIDEuXG4gICAgNC4gVHVybnMgYmVnaW4uIEVhY2ggdHVybiBjb25zaXRzIG9mOlxuICAgICAgICAxLiBjaG9vc2luZyBzcG90IHJ1bm5pZ24gY29tcHV0ZXJCb2FyZC5yZWNlaXZlKHNwb3QpXG4gICAgICAgIDIuIFN3aXRjaCB0dXJuXG5cblxuVG8gZG86IFxuICAgIDEuIE1ha2UgYWJpbGl0eSB0byBwbGFjZSBzaGlwcyBob3Jpem9udGFsbHlcbiAgICAyLiBjcmVhdGUgcmFuZG9tIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcbiAgICAyLiBcbiovXG5cblxuZnVuY3Rpb24gcGxheUdhbWUoKXtcblxuICAgIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKCdjb21wdXRlcicpXG4gICAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoJ2h1bWFuJylcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoJ3BsYXllcicpXG4gICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoJ2NvbXB1dGVyJylcblxuICAgIGNvbnN0IGNvbXB1dGVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItYm9hcmQnKTtcbiAgICBjb25zdCBwbGF5ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKTtcblxuXG5cbiAgICAvL3R3byB0ZXN0IHNoaXBzXG4gICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgJ3gnKVxuICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNzUsIDIsICd5JylcbiAgICBjb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDQsICd4JylcbiAgICBpbml0aWFsaXplQm9hcmQoKVxuICAgICAgICBcbiAgICBsZXQgdHVybiA9IFwicGxheWVyXCJcbiAgICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGUsIG9wcG9zaXRpb25Cb2FyZCl7XG4gICAgICAgIG9wcG9zaXRpb25Cb2FyZC5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmlkKSlcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChlKVxuICAgICAgICBzd2l0Y2hUdXJuKClcbiAgICAgICAgY29tcHV0ZXJUdXJuKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hUdXJuKCl7XG4gICAgICAgIGlmKHR1cm4gPT0gXCJwbGF5ZXJcIil7XG4gICAgICAgICAgICByZXR1cm4gdHVybiA9IFwiY29tcHV0ZXJcIlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZXJUdXJuKCl7XG4gICAgICAgIGxldCBzZWxlY3Rpb24gPSBjb21wdXRlclBsYXllci5yYW5kb21Nb3ZlKClcblxuICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzZWxlY3Rpb24pXG4gICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbilcbiAgICB9XG5cblxuXG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplQm9hcmQoKXtcbiAgICAgICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IGNib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2lkJywgaSlcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdCBjb21wdXRlci1zcG90XCIpXG4gICAgXG4gICAgICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+IHBsYXllclR1cm4oZSwgY29tcHV0ZXJHYW1lYm9hcmQpKTtcbiAgICBcbiAgICAgICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICAgICAgfVxuICAgICAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICAgIGZvciAobGV0IGk9MCA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGBwJHtpfWApXG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3RcIilcbiAgICAgICAgICAgIGlmKHBib2FyZFtpXS5zaGlwID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic2hpcCBcIil9XG4gICAgICAgICAgICBpZihwYm9hcmRbaV0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0IFwiKX1cbiAgICAgICAgICAgIGlmKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSl7c3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJtaXNzIFwiKX1cbiAgICAgICAgICAgXG4gICAgICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG5cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSl7XG4gICAgICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkXG4gICAgXG4gICAgICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICAgIGxldCBjc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZGV4KVxuICAgICAgICBpZihjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSl7Y3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic2hpcFwiKX1cbiAgICAgICAgaWYoY2JvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSl7Y3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0XCIpfVxuICAgICAgICBpZihjYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKXtjc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJtaXNzXCIpfVxuICAgIFxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pe1xuICAgICAgICBsZXQgaW5kZXggPSBzZWxlY3Rpb25cblxuICAgICAgICBsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICAgICAgY29uc29sZS5sb2cocGJvYXJkW2luZGV4XSlcbiAgICAgICAgbGV0IHBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2luZGV4fWApXG4gICAgICAgIGlmKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKXtwc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzaGlwXCIpfVxuICAgICAgICBpZihwYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKXtwc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJoaXRcIil9XG4gICAgICAgIGlmKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpe3BzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcIm1pc3NcIil9XG4gICAgfVxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLypcblxuLy90d28gdGVzdCBzaGlwc1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgJ3gnKVxucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg3NSwgMiwgJ3knKVxuY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCAneCcpXG5cblxuLy90ZXN0aW5nIGhpdCBhbmQgbWlzc1xucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soNDApXG5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjaygyMylcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCl7XG4gICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIGZvciAobGV0IGk9MCA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnaWQnLCBpKVxuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKVxuXG4gICAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBpZihwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXAgXCIpfVxuICAgICAgICBpZihwYm9hcmRbaV0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0IFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcIm1pc3MgXCIpfVxuICAgICAgIFxuICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwYm9hcmQpXG59XG4qL1xuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7IiwiXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGxldCBtZXRhID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBtb3ZlczogW10sXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gdHVybihzcG90KXtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG4gICAgICAgIGxldCB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IG1ldGEubW92ZXMubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgaWYoeCA9PT0gbWV0YS5tb3Zlc1tpXSl7XG4gICAgICAgICAgICAgICAgeCA9ICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAgXG5cbiAgICAgICAgbWV0YS5tb3Zlcy5wdXNoKHgpXG4gICAgICAgIHJldHVybiB4XG4gICAgfVxuICAgIC8qXG4gICAgY29uc3QgQUkgPSAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcblxuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByYW5kb21Nb3ZlLFxuICAgIH1cbn1cblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJjb25zdCBzaGlwID0gKGxlbmd0aCwgc3BvdCkgPT4ge1xuICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWBcbiAgICBsZXQgaGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdCA9IChoaXRMb2NhdGlvbikgPT4ge1xuICAgICAgICBoaXRzLnB1c2goe1xuICAgICAgICAgICAgaGl0TG9jYXRpb25cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAoaGl0cy5sZW5ndGggPT0gbGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7aGl0LCBoaXRzLCBsZW5ndGgsIGlzU3VuaywgaWR9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBzaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZygnSWYgeW91IHNlZSBtZS4uLicpXG5cbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IGluaXRpYWxpemVCb2FyZCBmcm9tIFwiLi9nYW1lY29udHJvbFwiXG5pbXBvcnQgcGxheUdhbWUgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIjtcblxuXG5wbGF5R2FtZSgpXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==