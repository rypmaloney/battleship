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




function initializeBoard(){
    const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)('computer')
    const computerDomBoard = document.getElementById('computer-board');

    let cboard = computerGameboard.getBoard()


    for (let i=0 ; i < cboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot")
        computerDomBoard.appendChild(spot)

    }

    const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)('player')
    const playerDomBoard = document.getElementById('player-board');

    let pboard = playerGameboard.getBoard()


    for (let i=0 ; i < pboard.length; i++){
        let spot = document.createElement('div');
        spot.setAttribute('id', i)
        spot.setAttribute('class', "spot")
        playerDomBoard.appendChild(spot)

    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQzBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBOztBQUVBLG9CQUFvQiw4Q0FBSTs7QUFFeEI7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdESTtBQUNNO0FBQ1Y7O0FBRXpCO0FBQ0EsOEJBQThCLG1EQUFTO0FBQ3ZDOztBQUVBOzs7QUFHQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixtREFBUztBQUNyQzs7QUFFQTs7O0FBR0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLGVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ2pDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQ3BDckI7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7OztBQUlBLGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ3RCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBLENBQTBCO0FBQ0k7QUFDTTtBQUNPOztBQUUzQyxxREFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIC8vaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdhbWVib2FyZFxuICBjb25zdCBtZXRhID0ge1xuICAgIHBsYXllck5hbWU6IHBsYXllcixcbiAgICBzaGlwczogW10sXG4gICAgbWlzc2VkSGl0czogW10sXG4gIH07XG4gIC8vY3JlYXRpb24gb2YgdGhlIGdhbWVib2FyZCB0aHJvdWdoIGxvb3Bpbmc7IDEweDEwOyB1c2UgYm9hcmRbeF1beV0gdG8gcmVmZXJlbmNlIGEgc3BhY2VcbiAgbGV0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDA7IHgrKykge1xuICAgIGJvYXJkLnB1c2goe1xuICAgICAgICBzaGlwOiBmYWxzZSxcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgIG1pc3NlZEhpdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAvL0JvYXJkIGdpdmV0aFxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIC8vXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChzcG90LCBsZW5ndGgpIHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG5cbiAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsc3BvdCkpO1xuXG4gICAgLy9vbmx5IHdvcmtzIGZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBzcG90IC09IDEwO1xuICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soc3BvdCkge1xuICAgIGlmIChib2FyZFtzcG90XS5pZCAhPSBudWxsKSB7XG4gICAgICAvL2ZpbmQgdGhlIGlkIG9mIHRoZSBib2F0IGF0IHRoYXQgbG9jYXRpb24gaW4gdGhlIG1ldGEuc2hpcHMgYXJyYXlcbiAgICAgIGxldCBpbmRleCA9IG1ldGEuc2hpcHMubWFwKChlKSA9PiBlLmlkKS5pbmRleE9mKGJvYXJkW3Nwb3RdLmlkKTtcblxuICAgICAgLy9oaXQgdGhhdCBib2F0IGF0IHRoZSBsb2NhdGlvblxuICAgICAgbWV0YS5zaGlwc1tpbmRleF0uaGl0KHNwb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXRhLm1pc3NlZEhpdHMucHVzaChzcG90KTtcbiAgICAgIGJvYXJkW3Nwb3RdLm1pc3NlZEhpdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZCxcbiAgICBtZXRhLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllcidcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnXG5pbXBvcnQgc2hpcCBmcm9tICcuL3NoaXAnXG5cbmZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpe1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKCdjb21wdXRlcicpXG4gICAgY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKClcblxuXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IGNib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBjb21wdXRlckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpXG5cbiAgICB9XG5cbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoJ3BsYXllcicpXG4gICAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWJvYXJkJyk7XG5cbiAgICBsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKClcblxuXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplQm9hcmQ7IiwiXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGxldCBtZXRhID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBtb3ZlczogW10sXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHVybihzcG90KXtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuICAgICAgICBsZXQgeCA9ICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuXG4gICAgICAgIG1ldGEubW92ZXMucHVzaCh4KVxuICAgICAgICByZXR1cm4geFxuICAgIH1cbiAgICAvKlxuICAgIGNvbnN0IEFJID0gKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICAqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcmFuZG9tTW92ZSxcbiAgICB9XG59XG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiY29uc3Qgc2hpcCA9IChsZW5ndGgsIHNwb3QpID0+IHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gXG4gICAgbGV0IGhpdHMgPSBbXTtcbiAgICBjb25zdCBoaXQgPSAoaGl0TG9jYXRpb24pID0+IHtcbiAgICAgICAgaGl0cy5wdXNoKHtcbiAgICAgICAgICAgIGhpdExvY2F0aW9uXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGhpdHMubGVuZ3RoID09IGxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2hpdCwgaGl0cywgbGVuZ3RoLCBpc1N1bmssIGlkfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgc2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ0lmIHlvdSBzZWUgbWUuLi4nKVxuXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBpbml0aWFsaXplQm9hcmQgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIlxuXG5pbml0aWFsaXplQm9hcmQoKVxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=