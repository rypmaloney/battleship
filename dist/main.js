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
    hits: [],
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


  function checkForWinner(){

    if(meta.hits.length === 15){
      return true
    }else {return false}
  }

  //Board giveth
  const getBoard = () => board;

  //
  function placeShip(spot, length, direction) {
    
    
    
    let id = `ship${spot}`;
    board[spot].ship = true;
    board[spot].id = id;

    meta.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length,spot));

    //for vertical ships
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
      meta.hits.push(spot)
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
    checkForWinner,
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


function playGame() {
  let shipDirection = "x";
  let currentPreviewLength = 5;

  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("computer");
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("human");
  const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("player");
  const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("computer");

  const computerDomBoard = document.getElementById("computer-board");
  const playerDomBoard = document.getElementById("player-board");
  const placeDomBoard = document.getElementById("place-board");




  initializeBoard()
  function switchd() {
    if (shipDirection === "x") {
      return (shipDirection = "y");
    } else return (shipDirection = "x");
  }

  //two test ships


  function switchTurn() {
    if (turn == "player") {
      return (turn = "computer");
    }
  }

  let turn = "player";
  function playerTurn(e, oppositionBoard) {
    oppositionBoard.receiveAttack(parseInt(e.target.id));
    updateComputerBoard(e);
    switchTurn();


    computerTurn();
  }

  function computerTurn() {
    let selection = computerPlayer.randomMove();
    playerGameboard.receiveAttack(selection);
    updatePlayerBoard(selection);
	if (playerGameboard.checkForWinner()){console.log('computerwon')}

  }

  function setPlayerBoard() {

	let pboard = playerGameboard.getBoard();
    for (let i = 0; i < pboard.length; i++) {
      let spot = document.getElementById(`p${i}`)

      if (pboard[i].ship == true) {
        spot.setAttribute("class", "ship p");
      }
      if (pboard[i].hit == true) {
        spot.setAttribute("class", "hit ");
      }
      if (pboard[i].missedHit == true) {
        spot.setAttribute("class", "miss");
      }


    }
  }
  function initializeBoard() {
    //Create computer board
    let cboard = computerGameboard.getBoard();
    for (let i = 0; i < cboard.length; i++) {
      let spot = document.createElement("div");
      spot.setAttribute("id", i);
      spot.setAttribute("class", "spot computer-spot");

      spot.addEventListener("click", (e) => playerTurn(e, computerGameboard));

      computerDomBoard.appendChild(spot);
    }
    //create player board
	let pboard = playerGameboard.getBoard();
    for (let i = 0; i < pboard.length; i++) {
      let spot = document.createElement("div");
      spot.setAttribute("id", `p${i}`);
      spot.setAttribute("class", "spot p");
      if (pboard[i].ship == true) {
        spot.setAttribute("class", "ship p");
      }
      if (pboard[i].hit == true) {
        spot.setAttribute("class", "hit ");
      }
      if (pboard[i].missedHit == true) {
        spot.setAttribute("class", "miss");
      }

      playerDomBoard.appendChild(spot);
    }
	selectShipsWalkThrough()

  }


  function displayPlaceBoard() {
    removeChildNodes(placeDomBoard);
    let placeBoard = playerGameboard.getBoard();
    for (let i = 0; i < placeBoard.length; i++) {
      let spot = document.createElement("div");

      spot.setAttribute("class", "spot p place");
      if (placeBoard[i].ship == true) {
        spot.setAttribute("class", "ship p place");
      }
      if (placeBoard[i].hit == true) {
        spot.setAttribute("class", "hit ");
      }
      if (placeBoard[i].missedHit == true) {
        spot.setAttribute("class", "miss ");
      }

      placeDomBoard.appendChild(spot);
    }
  }

  function selectShipsWalkThrough() {
    let currentPlaceShip = "carrier";

    const directionBtn = document.getElementById("switch-d");
    directionBtn.addEventListener("click", function () {
      switchd();
      displayPlaceBoard();
      let placeSpots = document.querySelectorAll(".place");
      //add event listener to add ship to player board, then display new board
      for (let i = 0; i < placeSpots.length; i++) {
        placeSpots[i].addEventListener("click", function () {
          playerGameboard.placeShip(i, currentPreviewLength, shipDirection);
          displayPlaceBoard();
        });
      }


      switch (currentPlaceShip) {
        case "carrier":
          placeCarrier();
          break;
        case "frigate":
          placeFrigate();
          break;
        case "cruiser":
          placeCruiser();
          break;
        case "sub":
          placeSub();
      }
      previewShip(currentPreviewLength, shipDirection);
    });

    displayPlaceBoard();

    placeCarrier();
    function placeCarrier() {
      let placeSpots = document.querySelectorAll(".place");
      updatePlaceLog("carrier");
      //add event listener to add ship to player board, then display new board
      for (let i = 0; i < placeSpots.length; i++) {
        placeSpots[i].addEventListener("click", function () {
          playerGameboard.placeShip(i, 5, shipDirection);
          displayPlaceBoard();
          placeFrigate();
          currentPlaceShip = "frigate";
        });
      }
      previewShip(5, shipDirection);
    }

    function placeFrigate() {
      currentPreviewLength = 4;
      let placeSpots = document.querySelectorAll(".place");
      updatePlaceLog("frigate");
      //add event listener to add ship to player board, then display new board
      for (let i = 0; i < placeSpots.length; i++) {
        placeSpots[i].addEventListener("click", function () {
          playerGameboard.placeShip(i, 4, shipDirection);
          displayPlaceBoard();
          placeCruiser();
          currentPlaceShip = "cruiser";
        });
      }
      previewShip(4, shipDirection);
    }

    function placeCruiser() {
      currentPreviewLength = 3;
      let placeSpots = document.querySelectorAll(".place");
      updatePlaceLog("cruiser");
      //add event listener to add ship to player board, then display new board
      for (let i = 0; i < placeSpots.length; i++) {
        placeSpots[i].addEventListener("click", function () {
          playerGameboard.placeShip(i, 3, shipDirection);
          displayPlaceBoard();
          placeSub();
          currentPlaceShip = "sub";
        });
      }
      previewShip(3, shipDirection);
    }

    function placeSub() {
      currentPreviewLength = 3;
      let placeSpots = document.querySelectorAll(".place");
      updatePlaceLog("Submarine");
      //add event listener to add ship to player board, then display new board
      for (let i = 0; i < placeSpots.length; i++) {
        placeSpots[i].addEventListener("click", function () {
          playerGameboard.placeShip(i, 3, shipDirection);
          displayPlaceBoard();
          setPlayerBoard()
          closeModal();
        });
      }
      previewShip(3, shipDirection);
    }
  }

  function updatePlaceLog(ship) {
    let log = document.getElementById("place-log");
    log.innerHTML = `<h3> Place a ${ship}</h3>`;
  }

  function removeChildNodes(parent) {
    while (parent.children[0]) {
      parent.removeChild(parent.children[0]);
    }
  }
  function updateComputerBoard(e) {
    let index = e.target.id;

    let cboard = computerGameboard.getBoard();
    let cspot = document.getElementById(index);
    if (cboard[index].ship == true) {
      cspot.setAttribute("class", "ship");
    }
    if (cboard[index].hit == true) {
      cspot.setAttribute("class", "hit");
    }
    if (cboard[index].missedHit == true) {
      cspot.setAttribute("class", "miss");
    }
  }
  function updatePlayerBoard(selection) {

    let index = selection;

    let pboard = playerGameboard.getBoard();


    let pspot = document.getElementById(`p${index}`);
    if (pboard[index].ship == true) {
      pspot.setAttribute("class", "ship p");
    }
    if (pboard[index].hit == true) {
      pspot.setAttribute("class", "hit");
    }
    if (pboard[index].missedHit == true) {
      pspot.setAttribute("class", "miss");
    }
  }

  ////////////////////////////////////////
  function openModal() {
    modal.style.display = "block";

    window.onclick = function (event) {
      if (event.target == about) {
        modal.style.display = "none";
      }
    };
  }

  function closeModal() {
    let modal = document.getElementById("place-ships-modal");
    modal.style.display = "none";
  }

  function previewShip(length, direction) {
    let pspots = document.querySelectorAll(".place");

    for (let i = 0; i < pspots.length; i++) {
      let dp = function () {
        displayPreview(i, direction, length);
      };
      let rp = function () {
        removePreview(i, direction, length);
      };
      pspots[i].addEventListener("mouseover", dp);
      pspots[i].addEventListener("mouseout", rp);
    }
    function displayPreview(index, direction, length) {
      if (direction == "x") {
        pspots[index].classList.add("hover");
        for (let j = 0; j < length; j++) {
          pspots[index + j].classList.add("hover");
        }
      } else {
        pspots[index].classList.add("hover");
        for (let j = 0; j < length - 1; j++) {
          pspots[(index -= 10)].classList.add("hover");
        }
      }
    }

    function removePreview(index, direction, length) {
      if (direction == "x") {
        pspots[index].classList.remove("hover");
        for (let j = 0; j < length; j++) {
          pspots[index + j].classList.remove("hover");
        }
      } else {
        pspots[index].classList.remove("hover");
        for (let j = 0; j < length; j++) {
          pspots[(index -= 10)].classList.remove("hover");
        }
      }
    }
  }



}


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

  
    let moveArray = []
    for (i = 0; i < 99; i ++){
        moveArray.push(i)
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(moveArray)
    let turnNumber = 0

    function randomMove(){
        let currentTurn = turnNumber
        turnNumber+=1

        return moveArray[currentTurn]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDOUNyQjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUEsQ0FBMEI7QUFDSTtBQUNNO0FBQ087QUFDTjs7O0FBR3JDLHFEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgLy9pbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2FtZWJvYXJkXG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgcGxheWVyTmFtZTogcGxheWVyLFxuICAgIHNoaXBzOiBbXSxcbiAgICBtaXNzZWRIaXRzOiBbXSxcbiAgICBoaXRzOiBbXSxcbiAgfTtcbiAgLy9jcmVhdGlvbiBvZiB0aGUgZ2FtZWJvYXJkIHRocm91Z2ggbG9vcGluZzsgMTB4MTA7IHVzZSBib2FyZFt4XVt5XSB0byByZWZlcmVuY2UgYSBzcGFjZVxuICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgYm9hcmQucHVzaCh7XG4gICAgICAgIHNoaXA6IGZhbHNlLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgbWlzc2VkSGl0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgZnVuY3Rpb24gY2hlY2tGb3JXaW5uZXIoKXtcblxuICAgIGlmKG1ldGEuaGl0cy5sZW5ndGggPT09IDE1KXtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfWVsc2Uge3JldHVybiBmYWxzZX1cbiAgfVxuXG4gIC8vQm9hcmQgZ2l2ZXRoXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgLy9cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgXG4gICAgXG4gICAgXG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YDtcbiAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuXG4gICAgbWV0YS5zaGlwcy5wdXNoKHNoaXAobGVuZ3RoLHNwb3QpKTtcblxuICAgIC8vZm9yIHZlcnRpY2FsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhzcG90KSB7XG4gICAgaWYgKGJvYXJkW3Nwb3RdLmlkICE9IG51bGwpIHtcbiAgICAgIC8vdXBkYXRlIHRoZSBib2FyZFxuICAgICAgYm9hcmRbc3BvdF0uaGl0ID0gdHJ1ZTtcblxuICAgICAgLy9maW5kIHRoZSBpZCBvZiB0aGUgYm9hdCBhdCB0aGF0IGxvY2F0aW9uIGluIHRoZSBtZXRhLnNoaXBzIGFycmF5XG4gICAgICBsZXQgaW5kZXggPSBtZXRhLnNoaXBzLm1hcCgoZSkgPT4gZS5pZCkuaW5kZXhPZihib2FyZFtzcG90XS5pZCk7XG5cbiAgICAgIC8vaGl0IHRoYXQgYm9hdCBhdCB0aGUgbG9jYXRpb25cbiAgICAgIG1ldGEuc2hpcHNbaW5kZXhdLmhpdChzcG90KTtcbiAgICAgIG1ldGEuaGl0cy5wdXNoKHNwb3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGEubWlzc2VkSGl0cy5wdXNoKHNwb3QpO1xuICAgICAgYm9hcmRbc3BvdF0ubWlzc2VkSGl0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkLFxuICAgIG1ldGEsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgY2hlY2tGb3JXaW5uZXIsXG4gIH07XG59O1xuXG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkOyIsImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG4vKiBTdGVwczpcbiAgICAxLiBJbml0aWFsaXplIGdhbWVib2FyZCB4XG4gICAgMi4gQ29tcHV0ZXIgcGlja3MgcmFuZG9tIHNoaXBzXG4gICAgMy4gUGxheWVyIHBsYWNlcyB0aGVpciBzaGlwczpcbiAgICAgICAgMS5cbiAgICA0LiBUdXJucyBiZWdpbi4gRWFjaCB0dXJuIGNvbnNpdHMgb2Y6XG4gICAgICAgIDEuIGNob29zaW5nIHNwb3QgcnVubmlnbiBjb21wdXRlckJvYXJkLnJlY2VpdmUoc3BvdClcbiAgICAgICAgMi4gU3dpdGNoIHR1cm5cblxuXG5UbyBkbzogXG4gICAgMS4gTWFrZSBhYmlsaXR5IHRvIHBsYWNlIHNoaXBzIGhvcml6b250YWxseVxuICAgIDIuIGNyZWF0ZSByYW5kb20gcGxhY2VtZW50IGZvciBjb21wdXRlclxuICAgIDIuIFxuKi9cblxuXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcbiAgbGV0IHNoaXBEaXJlY3Rpb24gPSBcInhcIjtcbiAgbGV0IGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNTtcblxuICBjb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihcImh1bWFuXCIpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJwbGF5ZXJcIik7XG4gIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG5cbiAgY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYWNlRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWJvYXJkXCIpO1xuXG5cblxuXG4gIGluaXRpYWxpemVCb2FyZCgpXG4gIGZ1bmN0aW9uIHN3aXRjaGQoKSB7XG4gICAgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInlcIik7XG4gICAgfSBlbHNlIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieFwiKTtcbiAgfVxuXG4gIC8vdHdvIHRlc3Qgc2hpcHNcblxuXG4gIGZ1bmN0aW9uIHN3aXRjaFR1cm4oKSB7XG4gICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXJcIikge1xuICAgICAgcmV0dXJuICh0dXJuID0gXCJjb21wdXRlclwiKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdHVybiA9IFwicGxheWVyXCI7XG4gIGZ1bmN0aW9uIHBsYXllclR1cm4oZSwgb3Bwb3NpdGlvbkJvYXJkKSB7XG4gICAgb3Bwb3NpdGlvbkJvYXJkLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuaWQpKTtcbiAgICB1cGRhdGVDb21wdXRlckJvYXJkKGUpO1xuICAgIHN3aXRjaFR1cm4oKTtcblxuXG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjb21wdXRlclR1cm4oKSB7XG4gICAgbGV0IHNlbGVjdGlvbiA9IGNvbXB1dGVyUGxheWVyLnJhbmRvbU1vdmUoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzZWxlY3Rpb24pO1xuICAgIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbik7XG5cdGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tGb3JXaW5uZXIoKSl7Y29uc29sZS5sb2coJ2NvbXB1dGVyd29uJyl9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFBsYXllckJvYXJkKCkge1xuXG5cdGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aX1gKVxuXG4gICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICB9XG5cblxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBpbml0aWFsaXplQm9hcmQoKSB7XG4gICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IGNvbXB1dGVyLXNwb3RcIik7XG5cbiAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKSk7XG5cbiAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgfVxuICAgIC8vY3JlYXRlIHBsYXllciBib2FyZFxuXHRsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwXCIpO1xuICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgfVxuXG4gICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG5cdHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKVxuXG4gIH1cblxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCkge1xuICAgIHJlbW92ZUNoaWxkTm9kZXMocGxhY2VEb21Cb2FyZCk7XG4gICAgbGV0IHBsYWNlQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcCBwbGFjZVwiKTtcbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwIHBsYWNlXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICB9XG5cbiAgICAgIHBsYWNlRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpIHtcbiAgICBsZXQgY3VycmVudFBsYWNlU2hpcCA9IFwiY2FycmllclwiO1xuXG4gICAgY29uc3QgZGlyZWN0aW9uQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2gtZFwiKTtcbiAgICBkaXJlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHN3aXRjaGQoKTtcbiAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCBjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cblxuICAgICAgc3dpdGNoIChjdXJyZW50UGxhY2VTaGlwKSB7XG4gICAgICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmcmlnYXRlXCI6XG4gICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjcnVpc2VyXCI6XG4gICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdWJcIjpcbiAgICAgICAgICBwbGFjZVN1YigpO1xuICAgICAgfVxuICAgICAgcHJldmlld1NoaXAoY3VycmVudFByZXZpZXdMZW5ndGgsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgIHBsYWNlQ2FycmllcigpO1xuICAgIGZ1bmN0aW9uIHBsYWNlQ2FycmllcigpIHtcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY2FycmllclwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiZnJpZ2F0ZVwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlRnJpZ2F0ZSgpIHtcbiAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNDtcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiZnJpZ2F0ZVwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiY3J1aXNlclwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlQ3J1aXNlcigpIHtcbiAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY3J1aXNlclwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJzdWJcIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBwcmV2aWV3U2hpcCgzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVN1YigpIHtcbiAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiU3VibWFyaW5lXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYWNlTG9nKHNoaXApIHtcbiAgICBsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG4gICAgbG9nLmlubmVySFRNTCA9IGA8aDM+IFBsYWNlIGEgJHtzaGlwfTwvaDM+YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNoaWxkTm9kZXMocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgbGV0IGNzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5kZXgpO1xuICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgIH1cbiAgICBpZiAoY2JvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgfVxuICAgIGlmIChjYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuXG4gICAgbGV0IGluZGV4ID0gc2VsZWN0aW9uO1xuXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG5cbiAgICBsZXQgcHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aW5kZXh9YCk7XG4gICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICB9XG4gICAgaWYgKHBib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgIH1cbiAgICBpZiAocGJvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgZnVuY3Rpb24gb3Blbk1vZGFsKCkge1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBhYm91dCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwcy1tb2RhbFwiKTtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aWV3U2hpcChsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgIGxldCBwc3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwc3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBkcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGlzcGxheVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgfTtcbiAgICAgIGxldCBycCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlUHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgICB9O1xuICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZHApO1xuICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICAgICAgcHNwb3RzWyhpbmRleCAtPSAxMCldLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgcHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG5cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTtcbiIsIlxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgICBsZXQgbWV0YSA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbW92ZXM6IFtdLFxuICAgIH1cblxuICBcbiAgICBsZXQgbW92ZUFycmF5ID0gW11cbiAgICBmb3IgKGkgPSAwOyBpIDwgOTk7IGkgKyspe1xuICAgICAgICBtb3ZlQXJyYXkucHVzaChpKVxuICAgIH1cbiAgICBmdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2h1ZmZsZUFycmF5KG1vdmVBcnJheSlcbiAgICBsZXQgdHVybk51bWJlciA9IDBcblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcbiAgICAgICAgbGV0IGN1cnJlbnRUdXJuID0gdHVybk51bWJlclxuICAgICAgICB0dXJuTnVtYmVyKz0xXG5cbiAgICAgICAgcmV0dXJuIG1vdmVBcnJheVtjdXJyZW50VHVybl1cbiAgICB9XG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZUJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCJcbmltcG9ydCBwbGF5R2FtZSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9