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

    if(meta.hits.length === 17){
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




/* 
To do: 
    1. Make dispay for win conditions
    2. fix place ship bugs
    3. clean up code
	4. make ai smarter 
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
		  break;
		case "patrol":
			placePatrol();
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
		  setPlayerBoard()
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
		  setPlayerBoard()
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
		  setPlayerBoard()
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
		  placePatrol()
		  currentPlaceShip = "patrol"
          setPlayerBoard()
        });
      }
      previewShip(3, shipDirection);
    }
	function placePatrol() {
		currentPreviewLength = 3;
		let placeSpots = document.querySelectorAll(".place");
		updatePlaceLog("Patrol Boat");
		//add event listener to add ship to player board, then display new board
		for (let i = 0; i < placeSpots.length; i++) {
		  placeSpots[i].addEventListener("click", function () {
			playerGameboard.placeShip(i, 2, shipDirection);
			displayPlaceBoard();
			setPlayerBoard()
			closeModal();
		  });
		}
		previewShip(2, shipDirection);
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
    for (let i = 0; i < 100; i ++){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0EsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUM5Q3JCO0FBQ0Esb0JBQW9CLEtBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7Ozs7QUFJQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUN0QnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQSxDQUEwQjtBQUNJO0FBQ007QUFDTztBQUNOOzs7QUFHckMscURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgc2hpcHM6IFtdLFxuICAgIG1pc3NlZEhpdHM6IFtdLFxuICAgIGhpdHM6IFtdLFxuICB9O1xuICAvL2NyZWF0aW9uIG9mIHRoZSBnYW1lYm9hcmQgdGhyb3VnaCBsb29waW5nOyAxMHgxMDsgdXNlIGJvYXJkW3hdW3ldIHRvIHJlZmVyZW5jZSBhIHNwYWNlXG4gIGxldCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICBmdW5jdGlvbiBjaGVja0Zvcldpbm5lcigpe1xuXG4gICAgaWYobWV0YS5oaXRzLmxlbmd0aCA9PT0gMTcpe1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9ZWxzZSB7cmV0dXJuIGZhbHNlfVxuICB9XG5cbiAgLy9Cb2FyZCBnaXZldGhcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvL1xuICBmdW5jdGlvbiBwbGFjZVNoaXAoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICBcbiAgICBcbiAgICBcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG5cbiAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsc3BvdCkpO1xuXG4gICAgLy9mb3IgdmVydGljYWwgc2hpcHNcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIil7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBzcG90IC09IDEwO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvL0hvcml6b250YWwgc2hpcHNcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIil7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBzcG90ICs9IDE7XG4gICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgXG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHNwb3QpIHtcbiAgICBpZiAoYm9hcmRbc3BvdF0uaWQgIT0gbnVsbCkge1xuICAgICAgLy91cGRhdGUgdGhlIGJvYXJkXG4gICAgICBib2FyZFtzcG90XS5oaXQgPSB0cnVlO1xuXG4gICAgICAvL2ZpbmQgdGhlIGlkIG9mIHRoZSBib2F0IGF0IHRoYXQgbG9jYXRpb24gaW4gdGhlIG1ldGEuc2hpcHMgYXJyYXlcbiAgICAgIGxldCBpbmRleCA9IG1ldGEuc2hpcHMubWFwKChlKSA9PiBlLmlkKS5pbmRleE9mKGJvYXJkW3Nwb3RdLmlkKTtcblxuICAgICAgLy9oaXQgdGhhdCBib2F0IGF0IHRoZSBsb2NhdGlvblxuICAgICAgbWV0YS5zaGlwc1tpbmRleF0uaGl0KHNwb3QpO1xuICAgICAgbWV0YS5oaXRzLnB1c2goc3BvdClcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0YS5taXNzZWRIaXRzLnB1c2goc3BvdCk7XG4gICAgICBib2FyZFtzcG90XS5taXNzZWRIaXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgbWV0YSxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0Zvcldpbm5lcixcbiAgfTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7IiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbi8qIFxuVG8gZG86IFxuICAgIDEuIE1ha2UgZGlzcGF5IGZvciB3aW4gY29uZGl0aW9uc1xuICAgIDIuIGZpeCBwbGFjZSBzaGlwIGJ1Z3NcbiAgICAzLiBjbGVhbiB1cCBjb2RlXG5cdDQuIG1ha2UgYWkgc21hcnRlciBcbiovXG5cblxuZnVuY3Rpb24gcGxheUdhbWUoKSB7XG4gIGxldCBzaGlwRGlyZWN0aW9uID0gXCJ4XCI7XG4gIGxldCBjdXJyZW50UHJldmlld0xlbmd0aCA9IDU7XG5cbiAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXIoXCJjb21wdXRlclwiKTtcbiAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoXCJodW1hblwiKTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwicGxheWVyXCIpO1xuICBjb25zdCBjb21wdXRlckdhbWVib2FyZCA9IGdhbWVib2FyZChcImNvbXB1dGVyXCIpO1xuXG4gIGNvbnN0IGNvbXB1dGVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICBjb25zdCBwbGF5ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLWJvYXJkXCIpO1xuICBjb25zdCBwbGFjZURvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1ib2FyZFwiKTtcblxuXG5cblxuICBpbml0aWFsaXplQm9hcmQoKVxuICBmdW5jdGlvbiBzd2l0Y2hkKCkge1xuICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ5XCIpO1xuICAgIH0gZWxzZSByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInhcIik7XG4gIH1cblxuICAvL3R3byB0ZXN0IHNoaXBzXG5cblxuICBmdW5jdGlvbiBzd2l0Y2hUdXJuKCkge1xuICAgIGlmICh0dXJuID09IFwicGxheWVyXCIpIHtcbiAgICAgIHJldHVybiAodHVybiA9IFwiY29tcHV0ZXJcIik7XG4gICAgfVxuICB9XG5cbiAgbGV0IHR1cm4gPSBcInBsYXllclwiO1xuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGUsIG9wcG9zaXRpb25Cb2FyZCkge1xuICAgIG9wcG9zaXRpb25Cb2FyZC5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmlkKSk7XG4gICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChlKTtcbiAgICBzd2l0Y2hUdXJuKCk7XG5cblxuICAgIGNvbXB1dGVyVHVybigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZXJUdXJuKCkge1xuICAgIGxldCBzZWxlY3Rpb24gPSBjb21wdXRlclBsYXllci5yYW5kb21Nb3ZlKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soc2VsZWN0aW9uKTtcbiAgICB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pO1xuXHRpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrRm9yV2lubmVyKCkpe2NvbnNvbGUubG9nKCdjb21wdXRlcndvbicpfVxuXG4gIH1cblxuICBmdW5jdGlvbiBzZXRQbGF5ZXJCb2FyZCgpIHtcblxuXHRsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2l9YClcblxuICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgfVxuXG5cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgIC8vQ3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICBjb21wdXRlckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgIH1cbiAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcblx0bGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGBwJHtpfWApO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcFwiKTtcbiAgICAgIGlmIChwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgIH1cblxuICAgICAgcGxheWVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgfVxuXHRzZWxlY3RTaGlwc1dhbGtUaHJvdWdoKClcblxuICB9XG5cblxuICBmdW5jdGlvbiBkaXNwbGF5UGxhY2VCb2FyZCgpIHtcbiAgICByZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpO1xuICAgIGxldCBwbGFjZUJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHAgcGxhY2VcIik7XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcCBwbGFjZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3MgXCIpO1xuICAgICAgfVxuXG4gICAgICBwbGFjZURvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKSB7XG4gICAgbGV0IGN1cnJlbnRQbGFjZVNoaXAgPSBcImNhcnJpZXJcIjtcblxuICAgIGNvbnN0IGRpcmVjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoLWRcIik7XG4gICAgZGlyZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzd2l0Y2hkKCk7XG4gICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgY3VycmVudFByZXZpZXdMZW5ndGgsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG5cbiAgICAgIHN3aXRjaCAoY3VycmVudFBsYWNlU2hpcCkge1xuICAgICAgICBjYXNlIFwiY2FycmllclwiOlxuICAgICAgICAgIHBsYWNlQ2FycmllcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZnJpZ2F0ZVwiOlxuICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY3J1aXNlclwiOlxuICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgcGxhY2VTdWIoKTtcblx0XHQgIGJyZWFrO1xuXHRcdGNhc2UgXCJwYXRyb2xcIjpcblx0XHRcdHBsYWNlUGF0cm9sKCk7XG4gICAgICB9XG4gICAgICBwcmV2aWV3U2hpcChjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbik7XG4gICAgfSk7XG5cbiAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuXG4gICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgZnVuY3Rpb24gcGxhY2VDYXJyaWVyKCkge1xuICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgdXBkYXRlUGxhY2VMb2coXCJjYXJyaWVyXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNSwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICBwbGFjZUZyaWdhdGUoKTtcbiAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJmcmlnYXRlXCI7XG5cdFx0ICBzZXRQbGF5ZXJCb2FyZCgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcHJldmlld1NoaXAoNSwgc2hpcERpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VGcmlnYXRlKCkge1xuICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSA0O1xuICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgdXBkYXRlUGxhY2VMb2coXCJmcmlnYXRlXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICBwbGFjZUNydWlzZXIoKTtcbiAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJjcnVpc2VyXCI7XG5cdFx0ICBzZXRQbGF5ZXJCb2FyZCgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcHJldmlld1NoaXAoNCwgc2hpcERpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCkge1xuICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgdXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpO1xuICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICBwbGFjZVN1YigpO1xuICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInN1YlwiO1xuXHRcdCAgc2V0UGxheWVyQm9hcmQoKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByZXZpZXdTaGlwKDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlU3ViKCkge1xuICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgdXBkYXRlUGxhY2VMb2coXCJTdWJtYXJpbmVcIik7XG4gICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCAzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuXHRcdCAgcGxhY2VQYXRyb2woKVxuXHRcdCAgY3VycmVudFBsYWNlU2hpcCA9IFwicGF0cm9sXCJcbiAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgfVxuXHRmdW5jdGlvbiBwbGFjZVBhdHJvbCgpIHtcblx0XHRjdXJyZW50UHJldmlld0xlbmd0aCA9IDM7XG5cdFx0bGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuXHRcdHVwZGF0ZVBsYWNlTG9nKFwiUGF0cm9sIEJvYXRcIik7XG5cdFx0Ly9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDIsIHNoaXBEaXJlY3Rpb24pO1xuXHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKTtcblx0XHRcdHNldFBsYXllckJvYXJkKClcblx0XHRcdGNsb3NlTW9kYWwoKTtcblx0XHQgIH0pO1xuXHRcdH1cblx0XHRwcmV2aWV3U2hpcCgyLCBzaGlwRGlyZWN0aW9uKTtcblx0ICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQbGFjZUxvZyhzaGlwKSB7XG4gICAgbGV0IGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtbG9nXCIpO1xuICAgIGxvZy5pbm5lckhUTUwgPSBgPGgzPiBQbGFjZSBhICR7c2hpcH08L2gzPmA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDaGlsZE5vZGVzKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQuY2hpbGRyZW5bMF0pIHtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuY2hpbGRyZW5bMF0pO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVDb21wdXRlckJvYXJkKGUpIHtcbiAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5pZDtcblxuICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGxldCBjc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZGV4KTtcbiAgICBpZiAoY2JvYXJkW2luZGV4XS5zaGlwID09IHRydWUpIHtcbiAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcFwiKTtcbiAgICB9XG4gICAgaWYgKGNib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgIH1cbiAgICBpZiAoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pIHtcblxuICAgIGxldCBpbmRleCA9IHNlbGVjdGlvbjtcblxuICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcblxuXG4gICAgbGV0IHBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2luZGV4fWApO1xuICAgIGlmIChwYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgfVxuICAgIGlmIChwYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICB9XG4gICAgaWYgKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICB9XG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIGZ1bmN0aW9uIG9wZW5Nb2RhbCgpIHtcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYWJvdXQpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2Utc2hpcHMtbW9kYWxcIik7XG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlld1NoaXAobGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICBsZXQgcHNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRpc3BsYXlQcmV2aWV3KGksIGRpcmVjdGlvbiwgbGVuZ3RoKTtcbiAgICAgIH07XG4gICAgICBsZXQgcnAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlbW92ZVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgfTtcbiAgICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGRwKTtcbiAgICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcnApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwbGF5UHJldmlldyhpbmRleCwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJcbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9XG5cbiAgXG4gICAgbGV0IG1vdmVBcnJheSA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkgKyspe1xuICAgICAgICBtb3ZlQXJyYXkucHVzaChpKVxuICAgIH1cbiAgICBmdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2h1ZmZsZUFycmF5KG1vdmVBcnJheSlcbiAgICBsZXQgdHVybk51bWJlciA9IDBcblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcbiAgICAgICAgbGV0IGN1cnJlbnRUdXJuID0gdHVybk51bWJlclxuICAgICAgICB0dXJuTnVtYmVyKz0xXG5cbiAgICAgICAgcmV0dXJuIG1vdmVBcnJheVtjdXJyZW50VHVybl1cbiAgICB9XG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZUJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCJcbmltcG9ydCBwbGF5R2FtZSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9