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

  function switchd() {
    if (shipDirection === "x") {
      return (shipDirection = "y");
    } else return (shipDirection = "x");
  }

  //two test ships

  initializeBoard();

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
  function setPlayerBoard(){
	removeChildNodes(playerDomBoard)
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
        spot.setAttribute("class", "miss ");
      }

      playerDomBoard.appendChild(spot);
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
    setPlayerBoard()
    selectShipsWalkThrough();
  }

  function displayPlaceBoard() {
    removeChildNodes(placeDomBoard);
    let placeBoard = playerGameboard.getBoard();
    for (let i = 0; i < placeBoard.length; i++) {
      let spot = document.createElement("div");
      spot.setAttribute("id", `p${i}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQzBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsS0FBSztBQUN6QjtBQUNBOztBQUVBLG9CQUFvQiw4Q0FBSTs7QUFFeEI7QUFDQTtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdCQUFnQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQVVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekZLO0FBQ007QUFDVjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLGdEQUFNO0FBQy9CLHNCQUFzQixnREFBTTtBQUM1QiwwQkFBMEIsbURBQVM7QUFDbkMsNEJBQTRCLG1EQUFTOztBQUVyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBLGtDQUFrQyxFQUFFO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0Esa0NBQWtDLEVBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxLQUFLO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ25ZeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDL0NyQjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUEsQ0FBMEI7QUFDSTtBQUNNO0FBQ087QUFDTjs7O0FBR3JDLHFEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgLy9pbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2FtZWJvYXJkXG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgcGxheWVyTmFtZTogcGxheWVyLFxuICAgIHNoaXBzOiBbXSxcbiAgICBtaXNzZWRIaXRzOiBbXSxcbiAgfTtcbiAgLy9jcmVhdGlvbiBvZiB0aGUgZ2FtZWJvYXJkIHRocm91Z2ggbG9vcGluZzsgMTB4MTA7IHVzZSBib2FyZFt4XVt5XSB0byByZWZlcmVuY2UgYSBzcGFjZVxuICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgYm9hcmQucHVzaCh7XG4gICAgICAgIHNoaXA6IGZhbHNlLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgbWlzc2VkSGl0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gIC8vQm9hcmQgZ2l2ZXRoXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgLy9cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgXG4gICAgXG4gICAgXG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YDtcbiAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuXG4gICAgbWV0YS5zaGlwcy5wdXNoKHNoaXAobGVuZ3RoLHNwb3QpKTtcblxuICAgIC8vZm9yIHZlcnRpY2FsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhzcG90KSB7XG4gICAgaWYgKGJvYXJkW3Nwb3RdLmlkICE9IG51bGwpIHtcbiAgICAgIC8vdXBkYXRlIHRoZSBib2FyZFxuICAgICAgYm9hcmRbc3BvdF0uaGl0ID0gdHJ1ZTtcblxuICAgICAgLy9maW5kIHRoZSBpZCBvZiB0aGUgYm9hdCBhdCB0aGF0IGxvY2F0aW9uIGluIHRoZSBtZXRhLnNoaXBzIGFycmF5XG4gICAgICBsZXQgaW5kZXggPSBtZXRhLnNoaXBzLm1hcCgoZSkgPT4gZS5pZCkuaW5kZXhPZihib2FyZFtzcG90XS5pZCk7XG5cbiAgICAgIC8vaGl0IHRoYXQgYm9hdCBhdCB0aGUgbG9jYXRpb25cbiAgICAgIG1ldGEuc2hpcHNbaW5kZXhdLmhpdChzcG90KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0YS5taXNzZWRIaXRzLnB1c2goc3BvdCk7XG4gICAgICBib2FyZFtzcG90XS5taXNzZWRIaXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgbWV0YSxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgfTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuLyogU3RlcHM6XG4gICAgMS4gSW5pdGlhbGl6ZSBnYW1lYm9hcmQgeFxuICAgIDIuIENvbXB1dGVyIHBpY2tzIHJhbmRvbSBzaGlwc1xuICAgIDMuIFBsYXllciBwbGFjZXMgdGhlaXIgc2hpcHM6XG4gICAgICAgIDEuXG4gICAgNC4gVHVybnMgYmVnaW4uIEVhY2ggdHVybiBjb25zaXRzIG9mOlxuICAgICAgICAxLiBjaG9vc2luZyBzcG90IHJ1bm5pZ24gY29tcHV0ZXJCb2FyZC5yZWNlaXZlKHNwb3QpXG4gICAgICAgIDIuIFN3aXRjaCB0dXJuXG5cblxuVG8gZG86IFxuICAgIDEuIE1ha2UgYWJpbGl0eSB0byBwbGFjZSBzaGlwcyBob3Jpem9udGFsbHlcbiAgICAyLiBjcmVhdGUgcmFuZG9tIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcbiAgICAyLiBcbiovXG5cbmZ1bmN0aW9uIHJvdGF0ZU15U2hpcHMoKSB7XG4gIGlmIChzaGlwRGlyZWN0aW9uID09IFwieVwiKSB7XG4gICAgbGV0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXNwbGF5LXZlcnRpY2FsXCIpO1xuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICBsZXQgcm90YXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGFibGVcIik7XG4gICAgcm90YXRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm90YXRhYmxlLWNvbHVtblwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRpc3BsYXktaG9yaXpvbnRhbFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInhcIik7XG4gIH0gZWxzZSBpZiAoc2hpcERpcmVjdGlvbiA9PSBcInhcIikge1xuICAgIGxldCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGlzcGxheS1ob3Jpem9udGFsXCIpO1xuICAgIGxldCByb3RhdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0YWJsZVwiKTtcbiAgICByb3RhdGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3RhdGFibGUtcm93XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcC1kaXNwbGF5IGRpc3BsYXktdmVydGljYWxcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICBsZXQgc2hpcERpcmVjdGlvbiA9IFwieFwiO1xuICBsZXQgY3VycmVudFByZXZpZXdMZW5ndGggPSA1O1xuXG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGNvbnN0IGh1bWFuUGxheWVyID0gcGxheWVyKFwiaHVtYW5cIik7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbiAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJjb21wdXRlclwiKTtcblxuICBjb25zdCBjb21wdXRlckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbiAgY29uc3QgcGxhY2VEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtYm9hcmRcIik7XG5cbiAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGVcIik7XG4gIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcm90YXRlTXlTaGlwcygpKTtcblxuICBmdW5jdGlvbiBzd2l0Y2hkKCkge1xuICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ5XCIpO1xuICAgIH0gZWxzZSByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInhcIik7XG4gIH1cblxuICAvL3R3byB0ZXN0IHNoaXBzXG5cbiAgaW5pdGlhbGl6ZUJvYXJkKCk7XG5cbiAgZnVuY3Rpb24gc3dpdGNoVHVybigpIHtcbiAgICBpZiAodHVybiA9PSBcInBsYXllclwiKSB7XG4gICAgICByZXR1cm4gKHR1cm4gPSBcImNvbXB1dGVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIGxldCB0dXJuID0gXCJwbGF5ZXJcIjtcbiAgZnVuY3Rpb24gcGxheWVyVHVybihlLCBvcHBvc2l0aW9uQm9hcmQpIHtcbiAgICBvcHBvc2l0aW9uQm9hcmQucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5pZCkpO1xuICAgIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSk7XG4gICAgc3dpdGNoVHVybigpO1xuICAgIGNvbXB1dGVyVHVybigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZXJUdXJuKCkge1xuICAgIGxldCBzZWxlY3Rpb24gPSBjb21wdXRlclBsYXllci5yYW5kb21Nb3ZlKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soc2VsZWN0aW9uKTtcbiAgICB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pO1xuICB9XG4gIGZ1bmN0aW9uIHNldFBsYXllckJvYXJkKCl7XG5cdHJlbW92ZUNoaWxkTm9kZXMocGxheWVyRG9tQm9hcmQpXG5cdGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcCR7aX1gKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHBcIik7XG4gICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3MgXCIpO1xuICAgICAgfVxuXG4gICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG59XG4gIGZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpIHtcbiAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2JvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGkpO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKTtcblxuICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHBsYXllclR1cm4oZSwgY29tcHV0ZXJHYW1lYm9hcmQpKTtcblxuICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgc2V0UGxheWVyQm9hcmQoKVxuICAgIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCkge1xuICAgIHJlbW92ZUNoaWxkTm9kZXMocGxhY2VEb21Cb2FyZCk7XG4gICAgbGV0IHBsYWNlQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwIHBsYWNlXCIpO1xuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzIFwiKTtcbiAgICAgIH1cblxuICAgICAgcGxhY2VEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RTaGlwc1dhbGtUaHJvdWdoKCkge1xuICAgIGxldCBjdXJyZW50UGxhY2VTaGlwID0gXCJjYXJyaWVyXCI7XG5cbiAgICBjb25zdCBkaXJlY3Rpb25CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN3aXRjaC1kXCIpO1xuICAgIGRpcmVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgc3dpdGNoZCgpO1xuICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIGN1cnJlbnRQcmV2aWV3TGVuZ3RoLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY3VycmVudFBsYWNlU2hpcCkge1xuICAgICAgICBjYXNlIFwiY2FycmllclwiOlxuICAgICAgICAgIHBsYWNlQ2FycmllcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZnJpZ2F0ZVwiOlxuICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY3J1aXNlclwiOlxuICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKGN1cnJlbnRQcmV2aWV3TGVuZ3RoLCBzaGlwRGlyZWN0aW9uKTtcbiAgICB9KTtcblxuICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG5cbiAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICBmdW5jdGlvbiBwbGFjZUNhcnJpZXIoKSB7XG4gICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICB1cGRhdGVQbGFjZUxvZyhcImNhcnJpZXJcIik7XG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCA1LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcImZyaWdhdGVcIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBwcmV2aWV3U2hpcCg1LCBzaGlwRGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUZyaWdhdGUoKSB7XG4gICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDQ7XG4gICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICB1cGRhdGVQbGFjZUxvZyhcImZyaWdhdGVcIik7XG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCA0LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcImNydWlzZXJcIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBwcmV2aWV3U2hpcCg0LCBzaGlwRGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZUNydWlzZXIoKSB7XG4gICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDM7XG4gICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICB1cGRhdGVQbGFjZUxvZyhcImNydWlzZXJcIik7XG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCAzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwic3ViXCI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VTdWIoKSB7XG4gICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDM7XG4gICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICB1cGRhdGVQbGFjZUxvZyhcIlN1Ym1hcmluZVwiKTtcbiAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG5cdFx0ICBzZXRQbGF5ZXJCb2FyZCgpXG4gICAgICAgICAgY2xvc2VNb2RhbCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQbGFjZUxvZyhzaGlwKSB7XG4gIGxldCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWxvZ1wiKTtcbiAgbG9nLmlubmVySFRNTCA9IGA8aDM+IFBsYWNlIGEgJHtzaGlwfTwvaDM+YDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuY2hpbGRyZW5bMF0pO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVDb21wdXRlckJvYXJkKGUpIHtcbiAgbGV0IGluZGV4ID0gZS50YXJnZXQuaWQ7XG5cbiAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gIGxldCBjc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZGV4KTtcbiAgaWYgKGNib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICB9XG4gIGlmIChjYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gIH1cbiAgaWYgKGNib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuICBsZXQgaW5kZXggPSBzZWxlY3Rpb247XG5cbiAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG4gIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKTtcbiAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gIH1cbiAgaWYgKHBib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgfVxuICBpZiAocGJvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBvcGVuTW9kYWwoKSB7XG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGFib3V0KSB7XG4gICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIHByZXZpZXdTaGlwKGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gIGxldCBwc3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGRwID0gZnVuY3Rpb24gKCkge1xuICAgICAgZGlzcGxheVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgIH07XG4gICAgbGV0IHJwID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVtb3ZlUHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgfTtcbiAgICBwc3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBkcCk7XG4gICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycCk7XG4gIH1cbiAgZnVuY3Rpb24gZGlzcGxheVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICBwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG5cblxuLypcblxuLy90d28gdGVzdCBzaGlwc1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgJ3gnKVxucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg3NSwgMiwgJ3knKVxuY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCAneCcpXG5cblxuLy90ZXN0aW5nIGhpdCBhbmQgbWlzc1xucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soNDApXG5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjaygyMylcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCl7XG4gICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIGZvciAobGV0IGk9MCA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnaWQnLCBpKVxuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKVxuXG4gICAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBpZihwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXAgXCIpfVxuICAgICAgICBpZihwYm9hcmRbaV0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0IFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcIm1pc3MgXCIpfVxuICAgICAgIFxuICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwYm9hcmQpXG59XG4qL1xuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJcbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICBmdW5jdGlvbiB0dXJuKHNwb3Qpe1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcbiAgICAgICAgbGV0IHggPSAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcblxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgbWV0YS5tb3Zlcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICBpZih4ID09PSBtZXRhLm1vdmVzW2ldKXtcbiAgICAgICAgICAgICAgICB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICBcblxuICAgICAgICBtZXRhLm1vdmVzLnB1c2goeClcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZUJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCJcbmltcG9ydCBwbGF5R2FtZSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9