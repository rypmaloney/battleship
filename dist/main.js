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
/* harmony export */   "playGame": () => (/* binding */ playGame),
/* harmony export */   "computerGameboard": () => (/* binding */ computerGameboard)
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

const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("computer");
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("human");
const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("player");
const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("computer");

function playGame() {
    //Initial state for placement preview and game start
    let shipDirection = "x";
    let currentPreviewLength = 5;
    let turn = "player";

    // DOM

    const log = document.getElementById("log");
    const computerDomBoard = document.getElementById("computer-board");
    const playerDomBoard = document.getElementById("player-board");
    const placeDomBoard = document.getElementById("place-board");

    initializeBoard();

    placeRandomShips(5);
    placeRandomShips(4);
    placeRandomShips(3);
    placeRandomShips(3);
    placeRandomShips(2);

    function placeRandomShips(length) {
        let spot = Math.floor(Math.random() * 100);

        let randomD = Math.floor(Math.random() * 1);
        let direction = "x";
        if (randomD === 1) {
            direction = "y";
        }

        if (computerGameboard.checkPlacement(spot, length, direction)) {
            computerGameboard.placeShip(spot, length, direction);
        } else {
            placeRandomShips(length);
        }
    }
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
		if (computerGameboard.checkForWinner()) {
            log.innerText = "You WON!"
        }else if (computerGameboard.meta.success === true) {
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
            log.innerText = "The computer kicked your ass! You lost to a machine!"
        } else if (playerGameboard.meta.success === true) {
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
/* harmony import */ var _gamecontrol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamecontrol */ "./src/gamecontrol.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");




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
/* harmony import */ var _gamecontrol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamecontrol */ "./src/gamecontrol.js");
console.log('If you see me...')


;


(0,_gamecontrol__WEBPACK_IMPORTED_MODULE_0__.playGame)()





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLEtBQUs7QUFDN0I7QUFDQTs7QUFFQSx3QkFBd0IsOENBQUk7O0FBRTVCO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JJSztBQUNNO0FBQ1Y7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsZ0RBQU07QUFDN0Isb0JBQW9CLGdEQUFNO0FBQzFCLHdCQUF3QixtREFBUztBQUNqQywwQkFBMEIsbURBQVM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0MsbURBQW1ELEVBQUU7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0Esd0NBQXdDLEVBQUU7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0RBQWdELE1BQU07QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0MsZ0JBQWdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXVDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25aTTtBQUNWOzs7QUFHbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQU9BLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDcERyQjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7OztBQUdBLENBQTJEOzs7QUFHM0Qsc0RBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgICBjb25zdCBtZXRhID0ge1xuICAgICAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgICAgIHNoaXBzOiBbXSxcbiAgICAgICAgbWlzc2VkSGl0czogW10sXG4gICAgICAgIGhpdHM6IFtdLFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICB9O1xuICAgIC8vY3JlYXRpb24gb2YgdGhlIGdhbWVib2FyZCB0aHJvdWdoIGxvb3BpbmdcbiAgICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0Zvcldpbm5lcigpIHtcbiAgICAgICAgaWYgKG1ldGEuaGl0cy5sZW5ndGggPT09IDE3KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQm9hcmQgZ2l2ZXRoXG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIC8vXG4gICAgZnVuY3Rpb24gY2hlY2tQbGFjZW1lbnQoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICAgIGxldCBnb0ZvclkgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoc3BvdCAtIChsZW5ndGggLSAxKSAqIDEwIDwgMCkge1xuICAgICAgICAgICAgICAgIGdvRm9yWSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnb0ZvclkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChib2FyZFtzcG90XS5zaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR290Y2h5YSFcIik7XG4gICAgICAgICAgICAgICAgICAgIGdvRm9yWSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdvRm9yWSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjYW4ndCBkbyB0aGF0IVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgICAgbGV0IGdvRm9yWCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNwb3QgJSAxMCA9PT0gMCB8fCBib2FyZFtzcG90XS5zaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdvRm9yWCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzcG90ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ29Gb3JYID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNhbid0IGRvIHRoYXQhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlU2hpcChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcblxuICAgICAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsIHNwb3QpKTtcblxuICAgICAgICAvL2ZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzcG90IC09IDEwO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soc3BvdCkge1xuICAgICAgICBpZiAoYm9hcmRbc3BvdF0uaWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy91cGRhdGUgdGhlIGJvYXJkXG4gICAgICAgICAgICBib2FyZFtzcG90XS5oaXQgPSB0cnVlO1xuICAgICAgICAgICAgbWV0YS5zdWNjZXNzID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy9maW5kIHRoZSBpZCBvZiB0aGUgYm9hdCBhdCB0aGF0IGxvY2F0aW9uIGluIHRoZSBtZXRhLnNoaXBzIGFycmF5XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBtZXRhLnNoaXBzLm1hcCgoZSkgPT4gZS5pZCkuaW5kZXhPZihib2FyZFtzcG90XS5pZCk7XG5cbiAgICAgICAgICAgIC8vaGl0IHRoYXQgYm9hdCBhdCB0aGUgbG9jYXRpb25cbiAgICAgICAgICAgIG1ldGEuc2hpcHNbaW5kZXhdLmhpdChzcG90KTtcbiAgICAgICAgICAgIG1ldGEuaGl0cy5wdXNoKHNwb3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWV0YS5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICBtZXRhLm1pc3NlZEhpdHMucHVzaChzcG90KTtcbiAgICAgICAgICAgIGJvYXJkW3Nwb3RdLm1pc3NlZEhpdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRCb2FyZCxcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBjaGVja0Zvcldpbm5lcixcbiAgICAgICAgY2hlY2tQbGFjZW1lbnQsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcbiIsImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG4vKiBcblRvIGRvOiBcbiAgICAxLiBNYWtlIHJhbmRvbSBzaGlwIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcblx0Mi4gTWFrZSBkaXNwYXkgZm9yIHdpbiBjb25kaXRpb25zXG4gICAgMy4gbW92ZSBsb2dpYyBmb3Igc2hpcCBwbGFjZW1lbnQgb2sgaW50byBvd24gZnVuY3Rpb25cbiAgICA0LiBjbGVhbiB1cCBjb2RlXG5cdDUuIG1ha2UgYWkgc21hcnRlclxuXHQ2LiBtb3ZlIGdhbWUgd2luIGNvbmRpdGlvbnMgdG8gc29tZXdoZXJlIGVsc2U/ICBcbiovXG5cbmNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG5jb25zdCBodW1hblBsYXllciA9IHBsYXllcihcImh1bWFuXCIpO1xuY29uc3QgcGxheWVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwicGxheWVyXCIpO1xuY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJjb21wdXRlclwiKTtcblxuZnVuY3Rpb24gcGxheUdhbWUoKSB7XG4gICAgLy9Jbml0aWFsIHN0YXRlIGZvciBwbGFjZW1lbnQgcHJldmlldyBhbmQgZ2FtZSBzdGFydFxuICAgIGxldCBzaGlwRGlyZWN0aW9uID0gXCJ4XCI7XG4gICAgbGV0IGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNTtcbiAgICBsZXQgdHVybiA9IFwicGxheWVyXCI7XG5cbiAgICAvLyBET01cblxuICAgIGNvbnN0IGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICAgIGNvbnN0IHBsYXllckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG4gICAgY29uc3QgcGxhY2VEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtYm9hcmRcIik7XG5cbiAgICBpbml0aWFsaXplQm9hcmQoKTtcblxuICAgIHBsYWNlUmFuZG9tU2hpcHMoNSk7XG4gICAgcGxhY2VSYW5kb21TaGlwcyg0KTtcbiAgICBwbGFjZVJhbmRvbVNoaXBzKDMpO1xuICAgIHBsYWNlUmFuZG9tU2hpcHMoMyk7XG4gICAgcGxhY2VSYW5kb21TaGlwcygyKTtcblxuICAgIGZ1bmN0aW9uIHBsYWNlUmFuZG9tU2hpcHMobGVuZ3RoKSB7XG4gICAgICAgIGxldCBzcG90ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcblxuICAgICAgICBsZXQgcmFuZG9tRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEpO1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0gXCJ4XCI7XG4gICAgICAgIGlmIChyYW5kb21EID09PSAxKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBcInlcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21wdXRlckdhbWVib2FyZC5jaGVja1BsYWNlbWVudChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGFjZVJhbmRvbVNoaXBzKGxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9Td2l0Y2hpbmcgdGhlIGRpcmVjdGlvbiBvZiBzaGlwcyBmb3IgcHJldmlld3NcbiAgICBmdW5jdGlvbiBzd2l0Y2hkKCkge1xuICAgICAgICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieVwiKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieFwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hUdXJuKCkge1xuICAgICAgICBpZiAodHVybiA9PSBcInBsYXllclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gKHR1cm4gPSBcImNvbXB1dGVyXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheWVyVHVybihlLCBvcHBvc2l0aW9uQm9hcmQpIHtcbiAgICAgICAgb3Bwb3NpdGlvbkJvYXJkLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuaWQpKTtcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChlKTtcbiAgICAgICAgc3dpdGNoVHVybigpO1xuXHRcdGlmIChjb21wdXRlckdhbWVib2FyZC5jaGVja0Zvcldpbm5lcigpKSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJZb3UgV09OIVwiXG4gICAgICAgIH1lbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5tZXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIllvdSBoaXQgdGhlIGNvbXB1dGVyJ3Mgc2hpcCFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIllvdSBtaXNzZWQuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNvbXB1dGVyVHVybigpLCA1MDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVyVHVybigpIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGNvbXB1dGVyUGxheWVyLnJhbmRvbU1vdmUoKTtcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soc2VsZWN0aW9uKTtcbiAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoc2VsZWN0aW9uKTtcbiAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5jaGVja0Zvcldpbm5lcigpKSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJUaGUgY29tcHV0ZXIga2lja2VkIHlvdXIgYXNzISBZb3UgbG9zdCB0byBhIG1hY2hpbmUhXCJcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJHYW1lYm9hcmQubWV0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJUaGUgQ29tcHV0ZXIgaGl0IHlvdXIgc2hpcCFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBDb21wdXRlciBtaXNzZWQuXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL1VwZGF0ZXMgcGxheWVyYm9hcmQgYmFzZWQgb24gc2hpcCBwbGFjZW1lbnRzIGluIHBsYWNlbWVudCBwcmV2aWV3XG4gICAgLy8tLSBkb2VzIG5vdCByZW1ha2UgdGhlIGJvYXJkIGV2ZXJ5IHRpbWUhXG4gICAgZnVuY3Rpb24gc2V0UGxheWVyQm9hcmQoKSB7XG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2l9YCk7XG5cbiAgICAgICAgICAgIGlmIChwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQ3JlYXRlcyBpbml0aWFsIGJvYXJkIHN0YXRlIGJlZm9yZSBwbGF5ZXIgcGxhY2VzIHNoaXBzLlxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpIHtcbiAgICAgICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2JvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGkpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKTtcblxuICAgICAgICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+XG4gICAgICAgICAgICAgICAgcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwXCIpO1xuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RTaGlwc1dhbGtUaHJvdWdoKCk7XG4gICAgfVxuXG4gICAgLy9TZXRzIHVwIHByZXZpZXcgYm9hcmQgZm9yIHBsYXkgdG8gcGxhY2Ugc2hpcHNcbiAgICBmdW5jdGlvbiBkaXNwbGF5UGxhY2VCb2FyZCgpIHtcbiAgICAgICAgcmVtb3ZlQ2hpbGROb2RlcyhwbGFjZURvbUJvYXJkKTtcbiAgICAgICAgbGV0IHBsYWNlQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHAgcGxhY2VcIik7XG4gICAgICAgICAgICBpZiAocGxhY2VCb2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwIHBsYWNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZUJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3MgXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGFjZURvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9iZWdpbnMgdGhlIHdhbGt0aHJvdWdoIHByb2Nlc3MgZm9yIHBsYWNpbmcgc2hpcHNcbiAgICAvL3NlcGFyYXRlIGZ1bmN0aW9uIGZvciBlYWNoIHNoaXAgdHlwZVxuICAgIGZ1bmN0aW9uIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKSB7XG4gICAgICAgIGxldCBjdXJyZW50UGxhY2VTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoLWRcIik7XG4gICAgICAgIGRpcmVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpdGNoZCgpO1xuICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGxhY2VTaGlwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhcnJpZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmcmlnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY3J1aXNlclwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZUNydWlzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZVN1YigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGF0cm9sXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcChjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG5cbiAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlQ2FycmllcigpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY2FycmllclwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDUsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiZnJpZ2F0ZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ2FycmllcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCg1LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlRnJpZ2F0ZSgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNDtcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiZnJpZ2F0ZVwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDQsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiY3J1aXNlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCg0LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlQ3J1aXNlcigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY3J1aXNlclwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDMsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJzdWJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYXllckJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZUNydWlzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGFjZVN1YigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiU3VibWFyaW5lXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMywgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VQYXRyb2woKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInBhdHJvbFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlUGF0cm9sKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAyO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJQYXRyb2wgQm9hdFwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDIsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDIsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYXllckJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZVBhdHJvbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCgyLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYWNlTG9nKHNoaXApIHtcbiAgICAgICAgbGV0IGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtbG9nXCIpO1xuICAgICAgICBsb2cuaW5uZXJIVE1MID0gYDxoMz4gUGxhY2UgYSAke3NoaXB9PC9oMz5gO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUNoaWxkTm9kZXMocGFyZW50KSB7XG4gICAgICAgIHdoaWxlIChwYXJlbnQuY2hpbGRyZW5bMF0pIHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuY2hpbGRyZW5bMF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5pZDtcblxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgbGV0IGNzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5kZXgpO1xuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gc2VsZWN0aW9uO1xuXG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcblxuICAgICAgICBsZXQgcHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aW5kZXh9YCk7XG4gICAgICAgIGlmIChwYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICAgICAgICBsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLXNoaXBzLW1vZGFsXCIpO1xuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJldmlld1NoaXAobGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHBzcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwc3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHJwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGRwKTtcbiAgICAgICAgICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcnApO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRpc3BsYXlQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IC0gMTAgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHNwb3RzWyhpbmRleCAtPSAxMCldLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaG92ZXJcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggLSAxMCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBwbGF5R2FtZSwgY29tcHV0ZXJHYW1lYm9hcmQgfTtcbiIsImltcG9ydCBjb21wdXRlckdhbWVib2FyZCBmcm9tIFwiLi9nYW1lY29udHJvbFwiXG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiXG5cblxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgICBsZXQgbWV0YSA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbW92ZXM6IFtdLFxuICAgIH1cblxuICBcbiAgICBsZXQgbW92ZUFycmF5ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArKyl7XG4gICAgICAgIG1vdmVBcnJheS5wdXNoKGkpXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNodWZmbGVBcnJheShhcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaHVmZmxlQXJyYXkobW92ZUFycmF5KVxuICAgIGxldCB0dXJuTnVtYmVyID0gMFxuXG4gICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuICAgICAgICBsZXQgY3VycmVudFR1cm4gPSB0dXJuTnVtYmVyXG4gICAgICAgIHR1cm5OdW1iZXIrPTFcblxuICAgICAgICByZXR1cm4gbW92ZUFycmF5W2N1cnJlbnRUdXJuXVxuICAgIH1cblxuICAgIFxuICAgIC8qXG4gICAgY29uc3QgQUkgPSAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcblxuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByYW5kb21Nb3ZlLFxuXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuXG5pbXBvcnQgeyBwbGF5R2FtZSwgY29tcHV0ZXJHYW1lYm9hcmR9IGZyb20gXCIuL2dhbWVjb250cm9sXCI7XG5cblxucGxheUdhbWUoKVxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=