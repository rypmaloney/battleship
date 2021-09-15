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

function rotateMyShips() {
  if (shipDirection == "y") {
    let ships = document.querySelectorAll(".display-vertical");
    console.log(ships);
    let rotatable = document.getElementById("rotatable");
    rotatable.setAttribute("class", "rotatable-column");
    for (let i = 0; i < ships.length; i++) {
      ships[i].setAttribute("class", "display-horizontal");
    }

    return (shipDirection = "x");
  } else if (shipDirection == "x") {
    let ships = document.querySelectorAll(".display-horizontal");
    let rotatable = document.getElementById("rotatable");
    rotatable.setAttribute("class", "rotatable-row");
    for (let i = 0; i < ships.length; i++) {
      ships[i].setAttribute("class", "ship-display display-vertical");
    }

    return (shipDirection = "y");
  }
}

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

  const rotateBtn = document.getElementById("rotate");
  rotateBtn.addEventListener("click", () => rotateMyShips());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQSxpRUFBZSxNQUFNOzs7Ozs7Ozs7Ozs7OztBQy9DckI7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7OztBQUlBLGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ3RCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBLENBQTBCO0FBQ0k7QUFDTTtBQUNPO0FBQ047OztBQUdyQyxxREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gIC8vaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdhbWVib2FyZFxuICBjb25zdCBtZXRhID0ge1xuICAgIHBsYXllck5hbWU6IHBsYXllcixcbiAgICBzaGlwczogW10sXG4gICAgbWlzc2VkSGl0czogW10sXG4gIH07XG4gIC8vY3JlYXRpb24gb2YgdGhlIGdhbWVib2FyZCB0aHJvdWdoIGxvb3Bpbmc7IDEweDEwOyB1c2UgYm9hcmRbeF1beV0gdG8gcmVmZXJlbmNlIGEgc3BhY2VcbiAgbGV0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDA7IHgrKykge1xuICAgIGJvYXJkLnB1c2goe1xuICAgICAgICBzaGlwOiBmYWxzZSxcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgIG1pc3NlZEhpdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAvL0JvYXJkIGdpdmV0aFxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIC8vXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgIFxuICAgIFxuICAgIFxuICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWA7XG4gICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcblxuICAgIG1ldGEuc2hpcHMucHVzaChzaGlwKGxlbmd0aCxzcG90KSk7XG5cbiAgICAvL2ZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKXtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vSG9yaXpvbnRhbCBzaGlwc1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKXtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soc3BvdCkge1xuICAgIGlmIChib2FyZFtzcG90XS5pZCAhPSBudWxsKSB7XG4gICAgICAvL3VwZGF0ZSB0aGUgYm9hcmRcbiAgICAgIGJvYXJkW3Nwb3RdLmhpdCA9IHRydWU7XG5cbiAgICAgIC8vZmluZCB0aGUgaWQgb2YgdGhlIGJvYXQgYXQgdGhhdCBsb2NhdGlvbiBpbiB0aGUgbWV0YS5zaGlwcyBhcnJheVxuICAgICAgbGV0IGluZGV4ID0gbWV0YS5zaGlwcy5tYXAoKGUpID0+IGUuaWQpLmluZGV4T2YoYm9hcmRbc3BvdF0uaWQpO1xuXG4gICAgICAvL2hpdCB0aGF0IGJvYXQgYXQgdGhlIGxvY2F0aW9uXG4gICAgICBtZXRhLnNoaXBzW2luZGV4XS5oaXQoc3BvdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGEubWlzc2VkSGl0cy5wdXNoKHNwb3QpO1xuICAgICAgYm9hcmRbc3BvdF0ubWlzc2VkSGl0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEJvYXJkLFxuICAgIG1ldGEsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gIH07XG59O1xuXG5cblxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbi8qIFN0ZXBzOlxuICAgIDEuIEluaXRpYWxpemUgZ2FtZWJvYXJkIHhcbiAgICAyLiBDb21wdXRlciBwaWNrcyByYW5kb20gc2hpcHNcbiAgICAzLiBQbGF5ZXIgcGxhY2VzIHRoZWlyIHNoaXBzOlxuICAgICAgICAxLlxuICAgIDQuIFR1cm5zIGJlZ2luLiBFYWNoIHR1cm4gY29uc2l0cyBvZjpcbiAgICAgICAgMS4gY2hvb3Npbmcgc3BvdCBydW5uaWduIGNvbXB1dGVyQm9hcmQucmVjZWl2ZShzcG90KVxuICAgICAgICAyLiBTd2l0Y2ggdHVyblxuXG5cblRvIGRvOiBcbiAgICAxLiBNYWtlIGFiaWxpdHkgdG8gcGxhY2Ugc2hpcHMgaG9yaXpvbnRhbGx5XG4gICAgMi4gY3JlYXRlIHJhbmRvbSBwbGFjZW1lbnQgZm9yIGNvbXB1dGVyXG4gICAgMi4gXG4qL1xuXG5mdW5jdGlvbiByb3RhdGVNeVNoaXBzKCkge1xuICBpZiAoc2hpcERpcmVjdGlvbiA9PSBcInlcIikge1xuICAgIGxldCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGlzcGxheS12ZXJ0aWNhbFwiKTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgbGV0IHJvdGF0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm90YXRhYmxlXCIpO1xuICAgIHJvdGF0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvdGF0YWJsZS1jb2x1bW5cIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgc2hpcHNbaV0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkaXNwbGF5LWhvcml6b250YWxcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ4XCIpO1xuICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXktaG9yaXpvbnRhbFwiKTtcbiAgICBsZXQgcm90YXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGFibGVcIik7XG4gICAgcm90YXRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm90YXRhYmxlLXJvd1wiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAtZGlzcGxheSBkaXNwbGF5LXZlcnRpY2FsXCIpO1xuICAgIH1cblxuICAgIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcbiAgbGV0IHNoaXBEaXJlY3Rpb24gPSBcInhcIjtcbiAgbGV0IGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNTtcblxuICBjb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihcImh1bWFuXCIpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJwbGF5ZXJcIik7XG4gIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG5cbiAgY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYWNlRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWJvYXJkXCIpO1xuXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm90YXRlXCIpO1xuICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHJvdGF0ZU15U2hpcHMoKSk7XG4gIGluaXRpYWxpemVCb2FyZCgpXG4gIGZ1bmN0aW9uIHN3aXRjaGQoKSB7XG4gICAgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInlcIik7XG4gICAgfSBlbHNlIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieFwiKTtcbiAgfVxuXG4gIC8vdHdvIHRlc3Qgc2hpcHNcblxuXG4gIGZ1bmN0aW9uIHN3aXRjaFR1cm4oKSB7XG4gICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXJcIikge1xuICAgICAgcmV0dXJuICh0dXJuID0gXCJjb21wdXRlclwiKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdHVybiA9IFwicGxheWVyXCI7XG4gIGZ1bmN0aW9uIHBsYXllclR1cm4oZSwgb3Bwb3NpdGlvbkJvYXJkKSB7XG4gICAgb3Bwb3NpdGlvbkJvYXJkLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuaWQpKTtcbiAgICB1cGRhdGVDb21wdXRlckJvYXJkKGUpO1xuICAgIHN3aXRjaFR1cm4oKTtcbiAgICBjb21wdXRlclR1cm4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVyVHVybigpIHtcbiAgICBsZXQgc2VsZWN0aW9uID0gY29tcHV0ZXJQbGF5ZXIucmFuZG9tTW92ZSgpO1xuICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHNlbGVjdGlvbik7XG4gICAgdXBkYXRlUGxheWVyQm9hcmQoc2VsZWN0aW9uKTtcbiAgfVxuICBmdW5jdGlvbiBzZXRQbGF5ZXJCb2FyZCgpIHtcblxuXHRsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2l9YClcblxuICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgfVxuXG5cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgIC8vQ3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICBjb21wdXRlckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgIH1cbiAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcblx0bGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGBwJHtpfWApO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcFwiKTtcbiAgICAgIGlmIChwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcGxheWVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgfVxuXHRzZWxlY3RTaGlwc1dhbGtUaHJvdWdoKClcblxuICB9XG5cblxuICBmdW5jdGlvbiBkaXNwbGF5UGxhY2VCb2FyZCgpIHtcbiAgICByZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpO1xuICAgIGxldCBwbGFjZUJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHAgcGxhY2VcIik7XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcCBwbGFjZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3MgXCIpO1xuICAgICAgfVxuXG4gICAgICBwbGFjZURvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKSB7XG4gICAgbGV0IGN1cnJlbnRQbGFjZVNoaXAgPSBcImNhcnJpZXJcIjtcblxuICAgIGNvbnN0IGRpcmVjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoLWRcIik7XG4gICAgZGlyZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzd2l0Y2hkKCk7XG4gICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgY3VycmVudFByZXZpZXdMZW5ndGgsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjdXJyZW50UGxhY2VTaGlwKSB7XG4gICAgICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJmcmlnYXRlXCI6XG4gICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjcnVpc2VyXCI6XG4gICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdWJcIjpcbiAgICAgICAgICBwbGFjZVN1YigpO1xuICAgICAgfVxuICAgICAgcHJldmlld1NoaXAoY3VycmVudFByZXZpZXdMZW5ndGgsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH0pO1xuXG4gICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgIHBsYWNlQ2FycmllcigpO1xuICAgIGZ1bmN0aW9uIHBsYWNlQ2FycmllcigpIHtcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY2FycmllclwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiZnJpZ2F0ZVwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlRnJpZ2F0ZSgpIHtcbiAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNDtcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiZnJpZ2F0ZVwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiY3J1aXNlclwiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlQ3J1aXNlcigpIHtcbiAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY3J1aXNlclwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJzdWJcIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBwcmV2aWV3U2hpcCgzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVN1YigpIHtcbiAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiU3VibWFyaW5lXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYWNlTG9nKHNoaXApIHtcbiAgICBsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG4gICAgbG9nLmlubmVySFRNTCA9IGA8aDM+IFBsYWNlIGEgJHtzaGlwfTwvaDM+YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNoaWxkTm9kZXMocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgbGV0IGNzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5kZXgpO1xuICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgIH1cbiAgICBpZiAoY2JvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgfVxuICAgIGlmIChjYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuXG4gICAgbGV0IGluZGV4ID0gc2VsZWN0aW9uO1xuXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG5cbiAgICBsZXQgcHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aW5kZXh9YCk7XG4gICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICB9XG4gICAgaWYgKHBib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgIH1cbiAgICBpZiAocGJvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgZnVuY3Rpb24gb3Blbk1vZGFsKCkge1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBhYm91dCkge1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwcy1tb2RhbFwiKTtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aWV3U2hpcChsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgIGxldCBwc3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwc3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBkcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGlzcGxheVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgfTtcbiAgICAgIGxldCBycCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVtb3ZlUHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgICB9O1xuICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZHApO1xuICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICAgICAgcHNwb3RzWyhpbmRleCAtPSAxMCldLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgcHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTtcbiIsIlxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgICBsZXQgbWV0YSA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbW92ZXM6IFtdLFxuICAgIH1cblxuICAgIFxuICAgIFxuICAgIFxuICAgIGZ1bmN0aW9uIHR1cm4oc3BvdCl7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuICAgICAgICBsZXQgeCA9ICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuXG4gICAgICAgIGZvciAobGV0IGk9MCA7IGkgPCBtZXRhLm1vdmVzLmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgIGlmKHggPT09IG1ldGEubW92ZXNbaV0pe1xuICAgICAgICAgICAgICAgIHggPSAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgIFxuXG4gICAgICAgIG1ldGEubW92ZXMucHVzaCh4KVxuICAgICAgICByZXR1cm4geFxuICAgIH1cbiAgICAvKlxuICAgIGNvbnN0IEFJID0gKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICAqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcmFuZG9tTW92ZSxcbiAgICB9XG59XG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiY29uc3Qgc2hpcCA9IChsZW5ndGgsIHNwb3QpID0+IHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gXG4gICAgbGV0IGhpdHMgPSBbXTtcbiAgICBjb25zdCBoaXQgPSAoaGl0TG9jYXRpb24pID0+IHtcbiAgICAgICAgaGl0cy5wdXNoKHtcbiAgICAgICAgICAgIGhpdExvY2F0aW9uXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGhpdHMubGVuZ3RoID09IGxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2hpdCwgaGl0cywgbGVuZ3RoLCBpc1N1bmssIGlkfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgc2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ0lmIHlvdSBzZWUgbWUuLi4nKVxuXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBpbml0aWFsaXplQm9hcmQgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIlxuaW1wb3J0IHBsYXlHYW1lIGZyb20gXCIuL2dhbWVjb250cm9sXCI7XG5cblxucGxheUdhbWUoKVxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=