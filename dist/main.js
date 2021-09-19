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
                if (spot > 0) {
                    if (board[spot].ship === true) {
                        console.log("Gotchya!");
                        goForY = false;
                    }
                }
                spot -= 10;
            }

            if (goForY === true) {
                return true;
            } else {
                console.log("you can't do that!");
                return false;
            }
        } else {
            let goForX = true;
            for (let i = 0; i < length; i++) {
                if (spot < 100) {
                    if (board[spot].ship === true) {
                        goForX = false;
                    }
                }
                spot += 1;
                if (spot % 10 === 0 || spot > 102) {
                    goForX = false;
                }
                
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

	let placeShipIndex = 0
	let placementArray =  computerPlayer.makeRandomArray(100)

	placeRandomShips(5)

    placeRandomShips(4);
    placeRandomShips(3);
    placeRandomShips(3);
    placeRandomShips(2);
	

    function placeRandomShips(length) {
		let placed = false
		while (placed === false){
			let randomD = Math.floor(Math.random() * 2);
			let direction = "x";
			if (randomD === 1) {
				direction = "y";
			}
			
			if (computerGameboard.checkPlacement(placementArray[placeShipIndex], length, direction)) {
				computerGameboard.placeShip(placementArray[placeShipIndex], length, direction);
				placed = true
			} else {
				placeShipIndex +=1
				
			}

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
    };

    function makeRandomArray(number) {
        let array = [];
        for (let i = 0; i < number; i++) {
           array.push(i);
        }
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(array);
        return array
    }


    let moveArray = makeRandomArray(100);
    let turnNumber = 0;

    function randomMove() {
        let currentTurn = turnNumber;
        turnNumber += 1;

        return moveArray[currentTurn];
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
        makeRandomArray,
    };
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsS0FBSztBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdEQUFnRCxNQUFNO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsZ0NBQWdDLGdCQUFnQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Wk87QUFDVjs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNsRHRCO0FBQ0Esb0JBQW9CLEtBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7Ozs7QUFJQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUN0QnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTs7O0FBR0EsQ0FBMkQ7OztBQUczRCxzREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWNvbnRyb2wuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICAgIC8vaW5mb3JtYXRpb24gYWJvdXQgdGhlIGdhbWVib2FyZFxuICAgIGNvbnN0IG1ldGEgPSB7XG4gICAgICAgIHBsYXllck5hbWU6IHBsYXllcixcbiAgICAgICAgc2hpcHM6IFtdLFxuICAgICAgICBtaXNzZWRIaXRzOiBbXSxcbiAgICAgICAgaGl0czogW10sXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgIH07XG4gICAgLy9jcmVhdGlvbiBvZiB0aGUgZ2FtZWJvYXJkIHRocm91Z2ggbG9vcGluZ1xuICAgIGxldCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICAgICAgYm9hcmQucHVzaCh7XG4gICAgICAgICAgICBzaGlwOiBmYWxzZSxcbiAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgICAgIG1pc3NlZEhpdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrRm9yV2lubmVyKCkge1xuICAgICAgICBpZiAobWV0YS5oaXRzLmxlbmd0aCA9PT0gMTcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9Cb2FyZCBnaXZldGhcbiAgICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gICAgLy9cbiAgICBmdW5jdGlvbiBjaGVja1BsYWNlbWVudChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgICAgbGV0IGdvRm9yWSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChzcG90IC0gKGxlbmd0aCAtIDEpICogMTAgPCAwKSB7XG4gICAgICAgICAgICAgICAgZ29Gb3JZID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvRm9yWSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwb3QgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtzcG90XS5zaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdvdGNoeWEhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29Gb3JZID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdvRm9yWSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInlvdSBjYW4ndCBkbyB0aGF0IVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZ29Gb3JYID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc3BvdCA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbc3BvdF0uc2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29Gb3JYID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChzcG90ICUgMTAgPT09IDAgfHwgc3BvdCA+IDEwMikge1xuICAgICAgICAgICAgICAgICAgICBnb0ZvclggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnb0ZvclggPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2FuJ3QgZG8gdGhhdCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWA7XG4gICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuXG4gICAgICAgIG1ldGEuc2hpcHMucHVzaChzaGlwKGxlbmd0aCwgc3BvdCkpO1xuXG4gICAgICAgIC8vZm9yIHZlcnRpY2FsIHNoaXBzXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgICAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL0hvcml6b250YWwgc2hpcHNcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHNwb3QpIHtcbiAgICAgICAgaWYgKGJvYXJkW3Nwb3RdLmlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBib2FyZFxuICAgICAgICAgICAgYm9hcmRbc3BvdF0uaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG1ldGEuc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vZmluZCB0aGUgaWQgb2YgdGhlIGJvYXQgYXQgdGhhdCBsb2NhdGlvbiBpbiB0aGUgbWV0YS5zaGlwcyBhcnJheVxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbWV0YS5zaGlwcy5tYXAoKGUpID0+IGUuaWQpLmluZGV4T2YoYm9hcmRbc3BvdF0uaWQpO1xuXG4gICAgICAgICAgICAvL2hpdCB0aGF0IGJvYXQgYXQgdGhlIGxvY2F0aW9uXG4gICAgICAgICAgICBtZXRhLnNoaXBzW2luZGV4XS5oaXQoc3BvdCk7XG4gICAgICAgICAgICBtZXRhLmhpdHMucHVzaChzcG90KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1ldGEuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgbWV0YS5taXNzZWRIaXRzLnB1c2goc3BvdCk7XG4gICAgICAgICAgICBib2FyZFtzcG90XS5taXNzZWRIaXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0Qm9hcmQsXG4gICAgICAgIG1ldGEsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgY2hlY2tGb3JXaW5uZXIsXG4gICAgICAgIGNoZWNrUGxhY2VtZW50LFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuLyogXG5UbyBkbzogXG4gICAgMS4gTWFrZSByYW5kb20gc2hpcCBwbGFjZW1lbnQgZm9yIGNvbXB1dGVyXG5cdDIuIE1ha2UgZGlzcGF5IGZvciB3aW4gY29uZGl0aW9uc1xuICAgIDMuIG1vdmUgbG9naWMgZm9yIHNoaXAgcGxhY2VtZW50IG9rIGludG8gb3duIGZ1bmN0aW9uXG4gICAgNC4gY2xlYW4gdXAgY29kZVxuXHQ1LiBtYWtlIGFpIHNtYXJ0ZXJcblx0Ni4gbW92ZSBnYW1lIHdpbiBjb25kaXRpb25zIHRvIHNvbWV3aGVyZSBlbHNlPyAgXG4qL1xuXG5jb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xuY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoXCJodW1hblwiKTtcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbmNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICAgIC8vSW5pdGlhbCBzdGF0ZSBmb3IgcGxhY2VtZW50IHByZXZpZXcgYW5kIGdhbWUgc3RhcnRcbiAgICBsZXQgc2hpcERpcmVjdGlvbiA9IFwieFwiO1xuICAgIGxldCBjdXJyZW50UHJldmlld0xlbmd0aCA9IDU7XG4gICAgbGV0IHR1cm4gPSBcInBsYXllclwiO1xuXG4gICAgLy8gRE9NXG5cbiAgICBjb25zdCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKTtcbiAgICBjb25zdCBjb21wdXRlckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgICBjb25zdCBwbGF5ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLWJvYXJkXCIpO1xuICAgIGNvbnN0IHBsYWNlRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWJvYXJkXCIpO1xuXG4gICAgaW5pdGlhbGl6ZUJvYXJkKCk7XG5cblx0bGV0IHBsYWNlU2hpcEluZGV4ID0gMFxuXHRsZXQgcGxhY2VtZW50QXJyYXkgPSAgY29tcHV0ZXJQbGF5ZXIubWFrZVJhbmRvbUFycmF5KDEwMClcblxuXHRwbGFjZVJhbmRvbVNoaXBzKDUpXG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKDQpO1xuICAgIHBsYWNlUmFuZG9tU2hpcHMoMyk7XG4gICAgcGxhY2VSYW5kb21TaGlwcygzKTtcbiAgICBwbGFjZVJhbmRvbVNoaXBzKDIpO1xuXHRcblxuICAgIGZ1bmN0aW9uIHBsYWNlUmFuZG9tU2hpcHMobGVuZ3RoKSB7XG5cdFx0bGV0IHBsYWNlZCA9IGZhbHNlXG5cdFx0d2hpbGUgKHBsYWNlZCA9PT0gZmFsc2Upe1xuXHRcdFx0bGV0IHJhbmRvbUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcblx0XHRcdGxldCBkaXJlY3Rpb24gPSBcInhcIjtcblx0XHRcdGlmIChyYW5kb21EID09PSAxKSB7XG5cdFx0XHRcdGRpcmVjdGlvbiA9IFwieVwiO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRpZiAoY29tcHV0ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQocGxhY2VtZW50QXJyYXlbcGxhY2VTaGlwSW5kZXhdLCBsZW5ndGgsIGRpcmVjdGlvbikpIHtcblx0XHRcdFx0Y29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHBsYWNlbWVudEFycmF5W3BsYWNlU2hpcEluZGV4XSwgbGVuZ3RoLCBkaXJlY3Rpb24pO1xuXHRcdFx0XHRwbGFjZWQgPSB0cnVlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwbGFjZVNoaXBJbmRleCArPTFcblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHR9XG5cbiAgICB9XG5cbiAgICAvL1N3aXRjaGluZyB0aGUgZGlyZWN0aW9uIG9mIHNoaXBzIGZvciBwcmV2aWV3c1xuICAgIGZ1bmN0aW9uIHN3aXRjaGQoKSB7XG4gICAgICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ5XCIpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ4XCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN3aXRjaFR1cm4oKSB7XG4gICAgICAgIGlmICh0dXJuID09IFwicGxheWVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAodHVybiA9IFwiY29tcHV0ZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGUsIG9wcG9zaXRpb25Cb2FyZCkge1xuICAgICAgICBvcHBvc2l0aW9uQm9hcmQucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5pZCkpO1xuICAgICAgICB1cGRhdGVDb21wdXRlckJvYXJkKGUpO1xuICAgICAgICBzd2l0Y2hUdXJuKCk7XG5cdFx0aWYgKGNvbXB1dGVyR2FtZWJvYXJkLmNoZWNrRm9yV2lubmVyKCkpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIllvdSBXT04hXCJcbiAgICAgICAgfWVsc2UgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLm1ldGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiWW91IGhpdCB0aGUgY29tcHV0ZXIncyBzaGlwIVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiWW91IG1pc3NlZC5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29tcHV0ZXJUdXJuKCksIDUwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZXJUdXJuKCkge1xuICAgICAgICBsZXQgc2VsZWN0aW9uID0gY29tcHV0ZXJQbGF5ZXIucmFuZG9tTW92ZSgpO1xuICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzZWxlY3Rpb24pO1xuICAgICAgICB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pO1xuICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrRm9yV2lubmVyKCkpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBjb21wdXRlciBraWNrZWQgeW91ciBhc3MhIFlvdSBsb3N0IHRvIGEgbWFjaGluZSFcIlxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllckdhbWVib2FyZC5tZXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBDb21wdXRlciBoaXQgeW91ciBzaGlwIVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiVGhlIENvbXB1dGVyIG1pc3NlZC5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vVXBkYXRlcyBwbGF5ZXJib2FyZCBiYXNlZCBvbiBzaGlwIHBsYWNlbWVudHMgaW4gcGxhY2VtZW50IHByZXZpZXdcbiAgICAvLy0tIGRvZXMgbm90IHJlbWFrZSB0aGUgYm9hcmQgZXZlcnkgdGltZSFcbiAgICBmdW5jdGlvbiBzZXRQbGF5ZXJCb2FyZCgpIHtcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aX1gKTtcblxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9DcmVhdGVzIGluaXRpYWwgYm9hcmQgc3RhdGUgYmVmb3JlIHBsYXllciBwbGFjZXMgc2hpcHMuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgICAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT5cbiAgICAgICAgICAgICAgICBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcCR7aX1gKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHBcIik7XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXllckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKTtcbiAgICB9XG5cbiAgICAvL1NldHMgdXAgcHJldmlldyBib2FyZCBmb3IgcGxheSB0byBwbGFjZSBzaGlwc1xuICAgIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCkge1xuICAgICAgICByZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpO1xuICAgICAgICBsZXQgcGxhY2VCb2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcCBwbGFjZVwiKTtcbiAgICAgICAgICAgIGlmIChwbGFjZUJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlQm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JlZ2lucyB0aGUgd2Fsa3Rocm91Z2ggcHJvY2VzcyBmb3IgcGxhY2luZyBzaGlwc1xuICAgIC8vc2VwYXJhdGUgZnVuY3Rpb24gZm9yIGVhY2ggc2hpcCB0eXBlXG4gICAgZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQbGFjZVNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2gtZFwiKTtcbiAgICAgICAgZGlyZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzd2l0Y2hkKCk7XG4gICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRQbGFjZVNoaXApIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FycmllclwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZyaWdhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjcnVpc2VyXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXRyb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VQYXRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKGN1cnJlbnRQcmV2aWV3TGVuZ3RoLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgICAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDYXJyaWVyKCkge1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjYXJyaWVyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgNSwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNSwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJmcmlnYXRlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VGcmlnYXRlKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSA0O1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJmcmlnYXRlXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgNCwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJjcnVpc2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMywgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInN1YlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCgzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlU3ViKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJTdWJtYXJpbmVcIik7XG4gICAgICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5jaGVja1BsYWNlbWVudChpLCAzLCBzaGlwRGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCAzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZVBhdHJvbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwicGF0cm9sXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VQYXRyb2woKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDI7XG4gICAgICAgICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICAgICAgICB1cGRhdGVQbGFjZUxvZyhcIlBhdHJvbCBCb2F0XCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMiwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMiwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDIsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxhY2VMb2coc2hpcCkge1xuICAgICAgICBsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG4gICAgICAgIGxvZy5pbm5lckhUTUwgPSBgPGgzPiBQbGFjZSBhICR7c2hpcH08L2gzPmA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJCb2FyZChlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBsZXQgY3Nwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleCk7XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuICAgICAgICBsZXQgaW5kZXggPSBzZWxlY3Rpb247XG5cbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG4gICAgICAgIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKTtcbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGJvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIGxldCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2Utc2hpcHMtbW9kYWxcIik7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmV2aWV3U2hpcChsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgcHNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBzcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlQcmV2aWV3KGksIGRpcmVjdGlvbiwgbGVuZ3RoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgcnAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZHApO1xuICAgICAgICAgICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGlzcGxheVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aCAtIDE7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggLSAxMCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlUHJldmlldyhpbmRleCwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QuY29udGFpbnMoXCJob3ZlclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAtIDEwID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB7IHBsYXlHYW1lLCBjb21wdXRlckdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IGNvbXB1dGVyR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGxldCBtZXRhID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBtb3ZlczogW10sXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VSYW5kb21BcnJheShudW1iZXIpIHtcbiAgICAgICAgbGV0IGFycmF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyOyBpKyspIHtcbiAgICAgICAgICAgYXJyYXkucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2h1ZmZsZUFycmF5KGFycmF5KTtcbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxuXG5cbiAgICBsZXQgbW92ZUFycmF5ID0gbWFrZVJhbmRvbUFycmF5KDEwMCk7XG4gICAgbGV0IHR1cm5OdW1iZXIgPSAwO1xuXG4gICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRUdXJuID0gdHVybk51bWJlcjtcbiAgICAgICAgdHVybk51bWJlciArPSAxO1xuXG4gICAgICAgIHJldHVybiBtb3ZlQXJyYXlbY3VycmVudFR1cm5dO1xuICAgIH1cblxuICAgIC8qXG4gICAgY29uc3QgQUkgPSAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcblxuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByYW5kb21Nb3ZlLFxuICAgICAgICBtYWtlUmFuZG9tQXJyYXksXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjtcbiIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuXG5pbXBvcnQgeyBwbGF5R2FtZSwgY29tcHV0ZXJHYW1lYm9hcmR9IGZyb20gXCIuL2dhbWVjb250cm9sXCI7XG5cblxucGxheUdhbWUoKVxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=