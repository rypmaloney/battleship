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
  function placeShip(spot, length) {
    let id = `ship${spot}`;
    board[spot].ship = true;
    board[spot].id = id;

    meta.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length,spot));

    //only works for vertical ships
    for (let i = 0; i < length - 1; i++) {
      spot -= 10;
      board[spot].ship = true;
      board[spot].id = id;
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

*/


function turn(e){
    computerGameboard.receiveAttack(parseInt(e.target.id))
    updateBoard(e)
}










const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)('player')
const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)('computer')

const computerDomBoard = document.getElementById('computer-board');
const playerDomBoard = document.getElementById('player-board');


function updateBoard(e){
    let index = e.target.id

    let cboard = computerGameboard.getBoard()
    let spot = document.getElementById(index)
    if(cboard[index].ship == true){spot.setAttribute('class', "ship")}
    if(cboard[index].hit == true){spot.setAttribute('class', "hit")}
    if(cboard[index].missedHit == true){spot.setAttribute('class', "miss")}
}




//two test ships
playerGameboard.placeShip(50, 4)
playerGameboard.placeShip(75, 2)
computerGameboard.placeShip(50, 4)
computerGameboard.placeShip(75, 2)
computerGameboard.placeShip(98, 5)
computerGameboard.placeShip(33, 2)

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

        spot.addEventListener("click",(e)=> turn(e));

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeBoard);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQzBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBOztBQUVBLG9CQUFvQiw4Q0FBSTs7QUFFeEI7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEVJO0FBQ007QUFDVjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0Esd0JBQXdCLG1EQUFTO0FBQ2pDLDBCQUEwQixtREFBUzs7QUFFbkM7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGtDQUFrQztBQUNsQyx3Q0FBd0M7QUFDeEM7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBQ2xDLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ3hGOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ3BDckI7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7OztBQUlBLGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ3RCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBLENBQTBCO0FBQ0k7QUFDTTtBQUNPOzs7QUFHM0MscURBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgc2hpcHM6IFtdLFxuICAgIG1pc3NlZEhpdHM6IFtdLFxuICB9O1xuICAvL2NyZWF0aW9uIG9mIHRoZSBnYW1lYm9hcmQgdGhyb3VnaCBsb29waW5nOyAxMHgxMDsgdXNlIGJvYXJkW3hdW3ldIHRvIHJlZmVyZW5jZSBhIHNwYWNlXG4gIGxldCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgLy9Cb2FyZCBnaXZldGhcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvL1xuICBmdW5jdGlvbiBwbGFjZVNoaXAoc3BvdCwgbGVuZ3RoKSB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YDtcbiAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuXG4gICAgbWV0YS5zaGlwcy5wdXNoKHNoaXAobGVuZ3RoLHNwb3QpKTtcblxuICAgIC8vb25seSB3b3JrcyBmb3IgdmVydGljYWwgc2hpcHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgc3BvdCAtPSAxMDtcbiAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHNwb3QpIHtcbiAgICBpZiAoYm9hcmRbc3BvdF0uaWQgIT0gbnVsbCkge1xuICAgICAgLy91cGRhdGUgdGhlIGJvYXJkXG4gICAgICBib2FyZFtzcG90XS5oaXQgPSB0cnVlO1xuXG4gICAgICAvL2ZpbmQgdGhlIGlkIG9mIHRoZSBib2F0IGF0IHRoYXQgbG9jYXRpb24gaW4gdGhlIG1ldGEuc2hpcHMgYXJyYXlcbiAgICAgIGxldCBpbmRleCA9IG1ldGEuc2hpcHMubWFwKChlKSA9PiBlLmlkKS5pbmRleE9mKGJvYXJkW3Nwb3RdLmlkKTtcblxuICAgICAgLy9oaXQgdGhhdCBib2F0IGF0IHRoZSBsb2NhdGlvblxuICAgICAgbWV0YS5zaGlwc1tpbmRleF0uaGl0KHNwb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXRhLm1pc3NlZEhpdHMucHVzaChzcG90KTtcbiAgICAgIGJvYXJkW3Nwb3RdLm1pc3NlZEhpdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZCxcbiAgICBtZXRhLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllcidcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnXG5pbXBvcnQgc2hpcCBmcm9tICcuL3NoaXAnXG5cbi8qIFN0ZXBzOlxuICAgIDEuIEluaXRpYWxpemUgZ2FtZWJvYXJkIHhcbiAgICAyLiBDb21wdXRlciBwaWNrcyByYW5kb20gc2hpcHNcbiAgICAzLiBQbGF5ZXIgcGxhY2VzIHRoZWlyIHNoaXBzOlxuICAgICAgICAxLlxuICAgIDQuIFR1cm5zIGJlZ2luLiBFYWNoIHR1cm4gY29uc2l0cyBvZjpcbiAgICAgICAgMS4gY2hvb3Npbmcgc3BvdCBydW5uaWduIGNvbXB1dGVyQm9hcmQucmVjZWl2ZShzcG90KVxuICAgICAgICAyLiBTd2l0Y2ggdHVyblxuXG4qL1xuXG5cbmZ1bmN0aW9uIHR1cm4oZSl7XG4gICAgY29tcHV0ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5pZCkpXG4gICAgdXBkYXRlQm9hcmQoZSlcbn1cblxuXG5cblxuXG5cblxuXG5cblxuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCdwbGF5ZXInKVxuY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoJ2NvbXB1dGVyJylcblxuY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJyk7XG5cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQoZSl7XG4gICAgbGV0IGluZGV4ID0gZS50YXJnZXQuaWRcblxuICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgbGV0IHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleClcbiAgICBpZihjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSl7c3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzaGlwXCIpfVxuICAgIGlmKGNib2FyZFtpbmRleF0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0XCIpfVxuICAgIGlmKGNib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwibWlzc1wiKX1cbn1cblxuXG5cblxuLy90d28gdGVzdCBzaGlwc1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNClcbnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNzUsIDIpXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDQpXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoNzUsIDIpXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoOTgsIDUpXG5jb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoMzMsIDIpXG5cbi8vdGVzdGluZyBoaXQgYW5kIG1pc3NcbnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKDQwKVxucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soMjMpXG5cbmZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpe1xuICAgIC8vQ3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICBmb3IgKGxldCBpPTAgOyBpIDwgY2JvYXJkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2lkJywgaSlcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzcG90IGNvbXB1dGVyLXNwb3RcIilcblxuICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+IHR1cm4oZSkpO1xuXG4gICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBpZihwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXAgXCIpfVxuICAgICAgICBpZihwYm9hcmRbaV0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0IFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcIm1pc3MgXCIpfVxuICAgICAgIFxuICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwYm9hcmQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVCb2FyZDsiLCJcbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0dXJuKHNwb3Qpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG4gICAgICAgIGxldCB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG5cbiAgICAgICAgbWV0YS5tb3Zlcy5wdXNoKHgpXG4gICAgICAgIHJldHVybiB4XG4gICAgfVxuICAgIC8qXG4gICAgY29uc3QgQUkgPSAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcblxuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByYW5kb21Nb3ZlLFxuICAgIH1cbn1cblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJjb25zdCBzaGlwID0gKGxlbmd0aCwgc3BvdCkgPT4ge1xuICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWBcbiAgICBsZXQgaGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdCA9IChoaXRMb2NhdGlvbikgPT4ge1xuICAgICAgICBoaXRzLnB1c2goe1xuICAgICAgICAgICAgaGl0TG9jYXRpb25cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAoaGl0cy5sZW5ndGggPT0gbGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7aGl0LCBoaXRzLCBsZW5ndGgsIGlzU3VuaywgaWR9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBzaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZygnSWYgeW91IHNlZSBtZS4uLicpXG5cbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IGluaXRpYWxpemVCb2FyZCBmcm9tIFwiLi9nYW1lY29udHJvbFwiXG5cblxuaW5pdGlhbGl6ZUJvYXJkKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9