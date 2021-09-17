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
        success: false,
    };
    //creation of the gameboard through looping
    let board = [];
    for (let x = 0; x < 100; x++) {
        board.push({
            ship: false,
            id: null,
            hit: false,
            missedHit: false,
        });
    }

    function checkForWinner() {
        if (meta.hits.length === 17) {
            return true;
        } else {
            return false;
        }
    }

    //Board giveth
    const getBoard = () => board;

    //
    function checkPlacement(spot, length, direction) {
        if (direction === "y") {
            let goForY = true;

            if (spot - (length - 1) * 10 < 0) {
                goForY = false;
            } else {
                goForY = true;
            }
            for (let i = 0; i < length; i++) {
                if (board[spot].ship === true) {
                    console.log("Gotchya!");
                    goForY = false;
                }
                    spot -= 10;
            }

            if (goForY === true) {
                return true;
            } else {
                console.log("you can't do that!");
                return false;
            }
        }

        if (direction === "x") {
            let goForX = true;
            for (let i = 0; i < length; i++) {
                
                if (spot % 10 === 0 || board[spot].ship === true) {
                    goForX = false;
                }
                spot += 1;
            }
            if (goForX === true) {
                return true;
            } else {
                console.log("you can't do that!");
                return false;
            }
        }
    }

    function placeShip(spot, length, direction) {
        let id = `ship${spot}`;
        board[spot].ship = true;
        board[spot].id = id;

        meta.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length, spot));

        //for vertical ships
        if (direction === "y") {
            for (let i = 0; i < length - 1; i++) {
                spot -= 10;
                board[spot].ship = true;
                board[spot].id = id;
            }
        }
        //Horizontal ships
        if (direction === "x") {
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
            meta.success = true;

            //find the id of the boat at that location in the meta.ships array
            let index = meta.ships.map((e) => e.id).indexOf(board[spot].id);

            //hit that boat at the location
            meta.ships[index].hit(spot);
            meta.hits.push(spot);
        } else {
            meta.success = false;
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
        checkPlacement,
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
    1. Make random ship placement for computer
	2. Make dispay for win conditions
    3. move logic for ship placement ok into own function
    4. clean up code
	5. make ai smarter
	6. move game win conditions to somewhere else?  
*/

function playGame() {
    //Initial state for placement preview and game start
    let shipDirection = "x";
    let currentPreviewLength = 5;
    let turn = "player";

    // DOM
    const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("computer");
    const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("human");
    const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("player");
    const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("computer");

    const log = document.getElementById("log");
    const computerDomBoard = document.getElementById("computer-board");
    const playerDomBoard = document.getElementById("player-board");
    const placeDomBoard = document.getElementById("place-board");

    initializeBoard();
    //Switching the direction of ships for previews
    function switchd() {
        if (shipDirection === "x") {
            return (shipDirection = "y");
        } else return (shipDirection = "x");
    }

    function switchTurn() {
        if (turn == "player") {
            return (turn = "computer");
        }
    }

    function playerTurn(e, oppositionBoard) {
        oppositionBoard.receiveAttack(parseInt(e.target.id));
        updateComputerBoard(e);
        switchTurn();
        if (computerGameboard.meta.success === true) {
            log.innerText = "You hit the computer's ship!";
        } else {
            log.innerText = "You missed.";
        }

        setTimeout(() => computerTurn(), 500);
    }

    function computerTurn() {
        let selection = computerPlayer.randomMove();
        playerGameboard.receiveAttack(selection);
        updatePlayerBoard(selection);
        if (playerGameboard.checkForWinner()) {
            console.log("computerwon");
        }
        if (playerGameboard.meta.success === true) {
            log.innerText = "The Computer hit your ship!";
        } else {
            log.innerText = "The Computer missed.";
        }
    }

    //Updates playerboard based on ship placements in placement preview
    //-- does not remake the board every time!
    function setPlayerBoard() {
        let pboard = playerGameboard.getBoard();
        for (let i = 0; i < pboard.length; i++) {
            let spot = document.getElementById(`p${i}`);

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

    //Creates initial board state before player places ships.
    function initializeBoard() {
        //Create computer board
        let cboard = computerGameboard.getBoard();
        for (let i = 0; i < cboard.length; i++) {
            let spot = document.createElement("div");
            spot.setAttribute("id", i);
            spot.setAttribute("class", "spot computer-spot");

            spot.addEventListener("click", (e) =>
                playerTurn(e, computerGameboard)
            );

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
        selectShipsWalkThrough();
    }

    //Sets up preview board for play to place ships
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

    //begins the walkthrough process for placing ships
    //separate function for each ship type
    function selectShipsWalkThrough() {
        let currentPlaceShip = "carrier";
        const directionBtn = document.getElementById("switch-d");
        directionBtn.addEventListener("click", function () {
            switchd();
            displayPlaceBoard();

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
                    if (playerGameboard.checkPlacement(i, 5, shipDirection)) {
                        playerGameboard.placeShip(i, 5, shipDirection);
                        displayPlaceBoard();
                        placeFrigate();
                        currentPlaceShip = "frigate";
                        setPlayerBoard();
                    } else {
                        placeCarrier();
                    }
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
                    if (playerGameboard.checkPlacement(i, 4, shipDirection)) {
                        playerGameboard.placeShip(i, 4, shipDirection);
                        displayPlaceBoard();
                        placeCruiser();
                        currentPlaceShip = "cruiser";
                        setPlayerBoard();
                    } else {
                        placeFrigate();
                    }
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
                    if (playerGameboard.checkPlacement(i, 3, shipDirection)) {
                        playerGameboard.placeShip(i, 3, shipDirection);
                        displayPlaceBoard();
                        placeSub();
                        currentPlaceShip = "sub";
                        setPlayerBoard();
                    } else {
                        placeCruiser();
                    }
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
                    if (playerGameboard.checkPlacement(i, 3, shipDirection)) {
                        playerGameboard.placeShip(i, 3, shipDirection);
                        displayPlaceBoard();
                        placePatrol();
                        currentPlaceShip = "patrol";
                        setPlayerBoard();
                    } else {
                        placeSub();
                    }
                });
            }
            previewShip(3, shipDirection);
        }
        function placePatrol() {
            currentPreviewLength = 2;
            let placeSpots = document.querySelectorAll(".place");
            updatePlaceLog("Patrol Boat");
            //add event listener to add ship to player board, then display new board
            for (let i = 0; i < placeSpots.length; i++) {
                placeSpots[i].addEventListener("click", function () {
                    if (playerGameboard.checkPlacement(i, 2, shipDirection)) {
                        playerGameboard.placeShip(i, 2, shipDirection);
                        displayPlaceBoard();
                        setPlayerBoard();
                        closeModal();
                    } else {
                        placePatrol();
                    }
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
                    if (index - 10 >= 0) {
                        pspots[(index -= 10)].classList.add("hover");
                    }
                }
            }
        }

        function removePreview(index, direction, length) {
            if (direction == "x") {
                pspots[index].classList.remove("hover");
                for (let j = 0; j < length; j++) {
                    if (pspots[index + j].classList.contains("hover")) {
                        pspots[index + j].classList.remove("hover");
                    }
                }
            } else {
                pspots[index].classList.remove("hover");
                for (let j = 0; j < length; j++) {
                    if (index - 10 >= 0) {
                        pspots[(index -= 10)].classList.remove("hover");
                    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLEtBQUs7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0QsTUFBTTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxWHhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDOUNyQjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUEsQ0FBMEI7QUFDSTtBQUNNO0FBQ087QUFDTjs7O0FBR3JDLHFEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBnYW1lYm9hcmQgPSAocGxheWVyKSA9PiB7XG4gICAgLy9pbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2FtZWJvYXJkXG4gICAgY29uc3QgbWV0YSA9IHtcbiAgICAgICAgcGxheWVyTmFtZTogcGxheWVyLFxuICAgICAgICBzaGlwczogW10sXG4gICAgICAgIG1pc3NlZEhpdHM6IFtdLFxuICAgICAgICBoaXRzOiBbXSxcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgfTtcbiAgICAvL2NyZWF0aW9uIG9mIHRoZSBnYW1lYm9hcmQgdGhyb3VnaCBsb29waW5nXG4gICAgbGV0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDA7IHgrKykge1xuICAgICAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgICAgIHNoaXA6IGZhbHNlLFxuICAgICAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbWlzc2VkSGl0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tGb3JXaW5uZXIoKSB7XG4gICAgICAgIGlmIChtZXRhLmhpdHMubGVuZ3RoID09PSAxNykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL0JvYXJkIGdpdmV0aFxuICAgIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgICAvL1xuICAgIGZ1bmN0aW9uIGNoZWNrUGxhY2VtZW50KHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgICAgICBsZXQgZ29Gb3JZID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHNwb3QgLSAobGVuZ3RoIC0gMSkgKiAxMCA8IDApIHtcbiAgICAgICAgICAgICAgICBnb0ZvclkgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ29Gb3JZID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbc3BvdF0uc2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvdGNoeWEhXCIpO1xuICAgICAgICAgICAgICAgICAgICBnb0ZvclkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnb0ZvclkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2FuJ3QgZG8gdGhhdCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIGxldCBnb0ZvclggPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzcG90ICUgMTAgPT09IDAgfHwgYm9hcmRbc3BvdF0uc2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBnb0ZvclggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdvRm9yWCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjYW4ndCBkbyB0aGF0IVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVNoaXAoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YDtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG5cbiAgICAgICAgbWV0YS5zaGlwcy5wdXNoKHNoaXAobGVuZ3RoLCBzcG90KSk7XG5cbiAgICAgICAgLy9mb3IgdmVydGljYWwgc2hpcHNcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vSG9yaXpvbnRhbCBzaGlwc1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzcG90ICs9IDE7XG4gICAgICAgICAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soc3BvdCkge1xuICAgICAgICBpZiAoYm9hcmRbc3BvdF0uaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy91cGRhdGUgdGhlIGJvYXJkXG4gICAgICAgICAgICBib2FyZFtzcG90XS5oaXQgPSB0cnVlO1xuICAgICAgICAgICAgbWV0YS5zdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy9maW5kIHRoZSBpZCBvZiB0aGUgYm9hdCBhdCB0aGF0IGxvY2F0aW9uIGluIHRoZSBtZXRhLnNoaXBzIGFycmF5XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBtZXRhLnNoaXBzLm1hcCgoZSkgPT4gZS5pZCkuaW5kZXhPZihib2FyZFtzcG90XS5pZCk7XG5cbiAgICAgICAgICAgIC8vaGl0IHRoYXQgYm9hdCBhdCB0aGUgbG9jYXRpb25cbiAgICAgICAgICAgIG1ldGEuc2hpcHNbaW5kZXhdLmhpdChzcG90KTtcbiAgICAgICAgICAgIG1ldGEuaGl0cy5wdXNoKHNwb3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWV0YS5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICBtZXRhLm1pc3NlZEhpdHMucHVzaChzcG90KTtcbiAgICAgICAgICAgIGJvYXJkW3Nwb3RdLm1pc3NlZEhpdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRCb2FyZCxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBjaGVja0Zvcldpbm5lcixcbiAgICAgICAgY2hlY2tQbGFjZW1lbnQsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcbiIsImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG4vKiBcblRvIGRvOiBcbiAgICAxLiBNYWtlIHJhbmRvbSBzaGlwIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcblx0Mi4gTWFrZSBkaXNwYXkgZm9yIHdpbiBjb25kaXRpb25zXG4gICAgMy4gbW92ZSBsb2dpYyBmb3Igc2hpcCBwbGFjZW1lbnQgb2sgaW50byBvd24gZnVuY3Rpb25cbiAgICA0LiBjbGVhbiB1cCBjb2RlXG5cdDUuIG1ha2UgYWkgc21hcnRlclxuXHQ2LiBtb3ZlIGdhbWUgd2luIGNvbmRpdGlvbnMgdG8gc29tZXdoZXJlIGVsc2U/ICBcbiovXG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICAgIC8vSW5pdGlhbCBzdGF0ZSBmb3IgcGxhY2VtZW50IHByZXZpZXcgYW5kIGdhbWUgc3RhcnRcbiAgICBsZXQgc2hpcERpcmVjdGlvbiA9IFwieFwiO1xuICAgIGxldCBjdXJyZW50UHJldmlld0xlbmd0aCA9IDU7XG4gICAgbGV0IHR1cm4gPSBcInBsYXllclwiO1xuXG4gICAgLy8gRE9NXG4gICAgY29uc3QgY29tcHV0ZXJQbGF5ZXIgPSBwbGF5ZXIoXCJjb21wdXRlclwiKTtcbiAgICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihcImh1bWFuXCIpO1xuICAgIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbiAgICBjb25zdCBjb21wdXRlckdhbWVib2FyZCA9IGdhbWVib2FyZChcImNvbXB1dGVyXCIpO1xuXG4gICAgY29uc3QgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dcIik7XG4gICAgY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gICAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbiAgICBjb25zdCBwbGFjZURvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1ib2FyZFwiKTtcblxuICAgIGluaXRpYWxpemVCb2FyZCgpO1xuICAgIC8vU3dpdGNoaW5nIHRoZSBkaXJlY3Rpb24gb2Ygc2hpcHMgZm9yIHByZXZpZXdzXG4gICAgZnVuY3Rpb24gc3dpdGNoZCgpIHtcbiAgICAgICAgaWYgKHNoaXBEaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInlcIik7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInhcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3dpdGNoVHVybigpIHtcbiAgICAgICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuICh0dXJuID0gXCJjb21wdXRlclwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXllclR1cm4oZSwgb3Bwb3NpdGlvbkJvYXJkKSB7XG4gICAgICAgIG9wcG9zaXRpb25Cb2FyZC5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmlkKSk7XG4gICAgICAgIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSk7XG4gICAgICAgIHN3aXRjaFR1cm4oKTtcbiAgICAgICAgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLm1ldGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiWW91IGhpdCB0aGUgY29tcHV0ZXIncyBzaGlwIVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiWW91IG1pc3NlZC5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29tcHV0ZXJUdXJuKCksIDUwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZXJUdXJuKCkge1xuICAgICAgICBsZXQgc2VsZWN0aW9uID0gY29tcHV0ZXJQbGF5ZXIucmFuZG9tTW92ZSgpO1xuICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzZWxlY3Rpb24pO1xuICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pO1xuICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrRm9yV2lubmVyKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHV0ZXJ3b25cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5tZXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBDb21wdXRlciBoaXQgeW91ciBzaGlwIVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiVGhlIENvbXB1dGVyIG1pc3NlZC5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vVXBkYXRlcyBwbGF5ZXJib2FyZCBiYXNlZCBvbiBzaGlwIHBsYWNlbWVudHMgaW4gcGxhY2VtZW50IHByZXZpZXdcbiAgICAvLy0tIGRvZXMgbm90IHJlbWFrZSB0aGUgYm9hcmQgZXZlcnkgdGltZSFcbiAgICBmdW5jdGlvbiBzZXRQbGF5ZXJCb2FyZCgpIHtcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aX1gKTtcblxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9DcmVhdGVzIGluaXRpYWwgYm9hcmQgc3RhdGUgYmVmb3JlIHBsYXllciBwbGFjZXMgc2hpcHMuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgICAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT5cbiAgICAgICAgICAgICAgICBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcCR7aX1gKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHBcIik7XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXllckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKTtcbiAgICB9XG5cbiAgICAvL1NldHMgdXAgcHJldmlldyBib2FyZCBmb3IgcGxheSB0byBwbGFjZSBzaGlwc1xuICAgIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCkge1xuICAgICAgICByZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpO1xuICAgICAgICBsZXQgcGxhY2VCb2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcCBwbGFjZVwiKTtcbiAgICAgICAgICAgIGlmIChwbGFjZUJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlQm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JlZ2lucyB0aGUgd2Fsa3Rocm91Z2ggcHJvY2VzcyBmb3IgcGxhY2luZyBzaGlwc1xuICAgIC8vc2VwYXJhdGUgZnVuY3Rpb24gZm9yIGVhY2ggc2hpcCB0eXBlXG4gICAgZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQbGFjZVNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2gtZFwiKTtcbiAgICAgICAgZGlyZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzd2l0Y2hkKCk7XG4gICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRQbGFjZVNoaXApIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FycmllclwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZyaWdhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjcnVpc2VyXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXRyb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VQYXRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKGN1cnJlbnRQcmV2aWV3TGVuZ3RoLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgICAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDYXJyaWVyKCkge1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjYXJyaWVyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgNSwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNSwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJmcmlnYXRlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VGcmlnYXRlKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSA0O1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJmcmlnYXRlXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgNCwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJjcnVpc2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMywgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInN1YlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCgzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlU3ViKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJTdWJtYXJpbmVcIik7XG4gICAgICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5jaGVja1BsYWNlbWVudChpLCAzLCBzaGlwRGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCAzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZVBhdHJvbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwicGF0cm9sXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VQYXRyb2woKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDI7XG4gICAgICAgICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICAgICAgICB1cGRhdGVQbGFjZUxvZyhcIlBhdHJvbCBCb2F0XCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMiwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMiwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDIsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxhY2VMb2coc2hpcCkge1xuICAgICAgICBsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG4gICAgICAgIGxvZy5pbm5lckhUTUwgPSBgPGgzPiBQbGFjZSBhICR7c2hpcH08L2gzPmA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJCb2FyZChlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBsZXQgY3Nwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleCk7XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuICAgICAgICBsZXQgaW5kZXggPSBzZWxlY3Rpb247XG5cbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG4gICAgICAgIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKTtcbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGJvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2Utc2hpcHMtbW9kYWxcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2aWV3U2hpcChsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgcHNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBzcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQcmV2aWV3KGksIGRpcmVjdGlvbiwgbGVuZ3RoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgcnAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZHApO1xuICAgICAgICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGlzcGxheVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggLSAxMCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlUHJldmlldyhpbmRleCwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QuY29udGFpbnMoXCJob3ZlclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAtIDEwID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXlHYW1lO1xuIiwiXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGxldCBtZXRhID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBtb3ZlczogW10sXG4gICAgfVxuXG4gIFxuICAgIGxldCBtb3ZlQXJyYXkgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICsrKXtcbiAgICAgICAgbW92ZUFycmF5LnB1c2goaSlcbiAgICB9XG4gICAgZnVuY3Rpb24gc2h1ZmZsZUFycmF5KGFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICBbYXJyYXlbaV0sIGFycmF5W2pdXSA9IFthcnJheVtqXSwgYXJyYXlbaV1dO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNodWZmbGVBcnJheShtb3ZlQXJyYXkpXG4gICAgbGV0IHR1cm5OdW1iZXIgPSAwXG5cbiAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG4gICAgICAgIGxldCBjdXJyZW50VHVybiA9IHR1cm5OdW1iZXJcbiAgICAgICAgdHVybk51bWJlcis9MVxuXG4gICAgICAgIHJldHVybiBtb3ZlQXJyYXlbY3VycmVudFR1cm5dXG4gICAgfVxuICAgIC8qXG4gICAgY29uc3QgQUkgPSAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcblxuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByYW5kb21Nb3ZlLFxuICAgIH1cbn1cblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJjb25zdCBzaGlwID0gKGxlbmd0aCwgc3BvdCkgPT4ge1xuICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWBcbiAgICBsZXQgaGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdCA9IChoaXRMb2NhdGlvbikgPT4ge1xuICAgICAgICBoaXRzLnB1c2goe1xuICAgICAgICAgICAgaGl0TG9jYXRpb25cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAoaGl0cy5sZW5ndGggPT0gbGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7aGl0LCBoaXRzLCBsZW5ndGgsIGlzU3VuaywgaWR9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBzaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZygnSWYgeW91IHNlZSBtZS4uLicpXG5cbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IGluaXRpYWxpemVCb2FyZCBmcm9tIFwiLi9nYW1lY29udHJvbFwiXG5pbXBvcnQgcGxheUdhbWUgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIjtcblxuXG5wbGF5R2FtZSgpXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==