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
    function placeShip(spot, length, direction) {
        let id = `ship${spot}`;

        if (direction === "y") {
            if (spot - length * 10 < 0) {
                console.log("You cannot place a ship off the board");
            } else {
                board[spot].ship = true;
                board[spot].id = id;
                meta.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length, spot));
                for (let i = 0; i < length - 1; i++) {
                    spot -= 10;
                    board[spot].ship = true;
                    board[spot].id = id;
                }
            }
        }
        if (direction === "x"){
            let goForX = true
            for (let i = 0; i < length - 1; i++){
                 spot += 1
                 if (spot % 10 === 0){
                    goForX = false;
                 }
            }
            if (goForX === true){
                board[spot].ship = true;
                board[spot].id = id;
                meta.ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length, spot));
                for (let i = 0; i < length - 1; i++) {
                    spot += 1;
                    board[spot].ship = true;
                    board[spot].id = id;
                }
            }else {
                console.log("you can't do that!")
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
            let placeSpots = document.querySelectorAll(".place");
            //add event listener to add ship to player board, then display new board
            for (let i = 0; i < placeSpots.length; i++) {
                placeSpots[i].addEventListener("click", function () {
                    playerGameboard.placeShip(
                        i,
                        currentPreviewLength,
                        shipDirection
                    );
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
                    setPlayerBoard();
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
                    setPlayerBoard();
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
                    setPlayerBoard();
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
                    placePatrol();
                    currentPlaceShip = "patrol";
                    setPlayerBoard();
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
                    playerGameboard.placeShip(i, 2, shipDirection);
                    displayPlaceBoard();
                    setPlayerBoard();
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
					if (index - 10>= 0){
                    	pspots[(index -= 10)].classList.add("hover");
					}
                }
            }
        }

        function removePreview(index, direction, length) {
            if (direction == "x") {
                pspots[index].classList.remove("hover");
                for (let j = 0; j < length; j++) {
					if(pspots[index + j].classList.contains("hover")){
                    	pspots[index + j].classList.remove("hover");
					}
                }
            } else {
                pspots[index].classList.remove("hover");
                for (let j = 0; j < length; j++) {
					if(index -10 >= 0){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgICBjb25zdCBtZXRhID0ge1xuICAgICAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgICAgIHNoaXBzOiBbXSxcbiAgICAgICAgbWlzc2VkSGl0czogW10sXG4gICAgICAgIGhpdHM6IFtdLFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICB9O1xuICAgIC8vY3JlYXRpb24gb2YgdGhlIGdhbWVib2FyZCB0aHJvdWdoIGxvb3BpbmdcbiAgICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0Zvcldpbm5lcigpIHtcbiAgICAgICAgaWYgKG1ldGEuaGl0cy5sZW5ndGggPT09IDE3KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQm9hcmQgZ2l2ZXRoXG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIC8vXG4gICAgZnVuY3Rpb24gcGxhY2VTaGlwKHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWA7XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICAgIGlmIChzcG90IC0gbGVuZ3RoICogMTAgPCAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJZb3UgY2Fubm90IHBsYWNlIGEgc2hpcCBvZmYgdGhlIGJvYXJkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgIG1ldGEuc2hpcHMucHVzaChzaGlwKGxlbmd0aCwgc3BvdCkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIil7XG4gICAgICAgICAgICBsZXQgZ29Gb3JYID0gdHJ1ZVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspe1xuICAgICAgICAgICAgICAgICBzcG90ICs9IDFcbiAgICAgICAgICAgICAgICAgaWYgKHNwb3QgJSAxMCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGdvRm9yWCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ29Gb3JYID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgICAgIG1ldGEuc2hpcHMucHVzaChzaGlwKGxlbmd0aCwgc3BvdCkpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNhbid0IGRvIHRoYXQhXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHNwb3QpIHtcbiAgICAgICAgaWYgKGJvYXJkW3Nwb3RdLmlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBib2FyZFxuICAgICAgICAgICAgYm9hcmRbc3BvdF0uaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIG1ldGEuc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vZmluZCB0aGUgaWQgb2YgdGhlIGJvYXQgYXQgdGhhdCBsb2NhdGlvbiBpbiB0aGUgbWV0YS5zaGlwcyBhcnJheVxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbWV0YS5zaGlwcy5tYXAoKGUpID0+IGUuaWQpLmluZGV4T2YoYm9hcmRbc3BvdF0uaWQpO1xuXG4gICAgICAgICAgICAvL2hpdCB0aGF0IGJvYXQgYXQgdGhlIGxvY2F0aW9uXG4gICAgICAgICAgICBtZXRhLnNoaXBzW2luZGV4XS5oaXQoc3BvdCk7XG4gICAgICAgICAgICBtZXRhLmhpdHMucHVzaChzcG90KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1ldGEuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgbWV0YS5taXNzZWRIaXRzLnB1c2goc3BvdCk7XG4gICAgICAgICAgICBib2FyZFtzcG90XS5taXNzZWRIaXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0Qm9hcmQsXG4gICAgICAgIG1ldGEsXG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgY2hlY2tGb3JXaW5uZXIsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcbiIsImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG4vKiBcblRvIGRvOiBcbiAgICAxLiBNYWtlIHJhbmRvbSBzaGlwIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcblx0Mi4gTWFrZSBkaXNwYXkgZm9yIHdpbiBjb25kaXRpb25zXG4gICAgXG4gICAgNC4gY2xlYW4gdXAgY29kZVxuXHQ1LiBtYWtlIGFpIHNtYXJ0ZXJcblx0Ni4gbW92ZSBnYW1lIHdpbiBjb25kaXRpb25zIHRvIHNvbWV3aGVyZSBlbHNlPyAgXG4qL1xuXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcbiAgICAvL0luaXRpYWwgc3RhdGUgZm9yIHBsYWNlbWVudCBwcmV2aWV3IGFuZCBnYW1lIHN0YXJ0XG4gICAgbGV0IHNoaXBEaXJlY3Rpb24gPSBcInhcIjtcbiAgICBsZXQgY3VycmVudFByZXZpZXdMZW5ndGggPSA1O1xuICAgIGxldCB0dXJuID0gXCJwbGF5ZXJcIjtcblxuICAgIC8vIERPTVxuICAgIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG4gICAgY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoXCJodW1hblwiKTtcbiAgICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJwbGF5ZXJcIik7XG4gICAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJjb21wdXRlclwiKTtcblxuICAgIGNvbnN0IGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXB1dGVyLWJvYXJkXCIpO1xuICAgIGNvbnN0IHBsYXllckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG4gICAgY29uc3QgcGxhY2VEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtYm9hcmRcIik7XG5cbiAgICBpbml0aWFsaXplQm9hcmQoKTtcbiAgICAvL1N3aXRjaGluZyB0aGUgZGlyZWN0aW9uIG9mIHNoaXBzIGZvciBwcmV2aWV3c1xuICAgIGZ1bmN0aW9uIHN3aXRjaGQoKSB7XG4gICAgICAgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ5XCIpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ4XCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN3aXRjaFR1cm4oKSB7XG4gICAgICAgIGlmICh0dXJuID09IFwicGxheWVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAodHVybiA9IFwiY29tcHV0ZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGUsIG9wcG9zaXRpb25Cb2FyZCkge1xuICAgICAgICBvcHBvc2l0aW9uQm9hcmQucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5pZCkpO1xuICAgICAgICB1cGRhdGVDb21wdXRlckJvYXJkKGUpO1xuICAgICAgICBzd2l0Y2hUdXJuKCk7XG4gICAgICAgIGlmIChjb21wdXRlckdhbWVib2FyZC5tZXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIllvdSBoaXQgdGhlIGNvbXB1dGVyJ3Mgc2hpcCFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIllvdSBtaXNzZWQuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNvbXB1dGVyVHVybigpLCA1MDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVyVHVybigpIHtcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IGNvbXB1dGVyUGxheWVyLnJhbmRvbU1vdmUoKTtcbiAgICAgICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soc2VsZWN0aW9uKTtcbiAgICAgICAgdXBkYXRlUGxheWVyQm9hcmQoc2VsZWN0aW9uKTtcbiAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5jaGVja0Zvcldpbm5lcigpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyd29uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQubWV0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJUaGUgQ29tcHV0ZXIgaGl0IHlvdXIgc2hpcCFcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBDb21wdXRlciBtaXNzZWQuXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL1VwZGF0ZXMgcGxheWVyYm9hcmQgYmFzZWQgb24gc2hpcCBwbGFjZW1lbnRzIGluIHBsYWNlbWVudCBwcmV2aWV3XG4gICAgLy8tLSBkb2VzIG5vdCByZW1ha2UgdGhlIGJvYXJkIGV2ZXJ5IHRpbWUhXG4gICAgZnVuY3Rpb24gc2V0UGxheWVyQm9hcmQoKSB7XG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2l9YCk7XG5cbiAgICAgICAgICAgIGlmIChwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQ3JlYXRlcyBpbml0aWFsIGJvYXJkIHN0YXRlIGJlZm9yZSBwbGF5ZXIgcGxhY2VzIHNoaXBzLlxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpIHtcbiAgICAgICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICAgICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2JvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGkpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKTtcblxuICAgICAgICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+XG4gICAgICAgICAgICAgICAgcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwXCIpO1xuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RTaGlwc1dhbGtUaHJvdWdoKCk7XG4gICAgfVxuXG4gICAgLy9TZXRzIHVwIHByZXZpZXcgYm9hcmQgZm9yIHBsYXkgdG8gcGxhY2Ugc2hpcHNcbiAgICBmdW5jdGlvbiBkaXNwbGF5UGxhY2VCb2FyZCgpIHtcbiAgICAgICAgcmVtb3ZlQ2hpbGROb2RlcyhwbGFjZURvbUJvYXJkKTtcbiAgICAgICAgbGV0IHBsYWNlQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHAgcGxhY2VcIik7XG4gICAgICAgICAgICBpZiAocGxhY2VCb2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwIHBsYWNlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGFjZUJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3MgXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGFjZURvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9iZWdpbnMgdGhlIHdhbGt0aHJvdWdoIHByb2Nlc3MgZm9yIHBsYWNpbmcgc2hpcHNcbiAgICAvL3NlcGFyYXRlIGZ1bmN0aW9uIGZvciBlYWNoIHNoaXAgdHlwZVxuICAgIGZ1bmN0aW9uIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKSB7XG4gICAgICAgIGxldCBjdXJyZW50UGxhY2VTaGlwID0gXCJjYXJyaWVyXCI7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoLWRcIik7XG4gICAgICAgIGRpcmVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpdGNoZCgpO1xuICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgICAgICAgICAgICAgaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcERpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGxhY2VTaGlwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhcnJpZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmcmlnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY3J1aXNlclwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZUNydWlzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZVN1YigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGF0cm9sXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcChjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG5cbiAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlQ2FycmllcigpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY2FycmllclwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZUZyaWdhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiZnJpZ2F0ZVwiO1xuICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoNSwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGFjZUZyaWdhdGUoKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDQ7XG4gICAgICAgICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICAgICAgICB1cGRhdGVQbGFjZUxvZyhcImZyaWdhdGVcIik7XG4gICAgICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCA0LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcImNydWlzZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInN1YlwiO1xuICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGFjZVN1YigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiU3VibWFyaW5lXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInBhdHJvbFwiO1xuICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VQYXRyb2woKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDI7XG4gICAgICAgICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICAgICAgICB1cGRhdGVQbGFjZUxvZyhcIlBhdHJvbCBCb2F0XCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMiwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFBsYXllckJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDIsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxhY2VMb2coc2hpcCkge1xuICAgICAgICBsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG4gICAgICAgIGxvZy5pbm5lckhUTUwgPSBgPGgzPiBQbGFjZSBhICR7c2hpcH08L2gzPmA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJCb2FyZChlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBsZXQgY3Nwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleCk7XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuICAgICAgICBsZXQgaW5kZXggPSBzZWxlY3Rpb247XG5cbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG4gICAgICAgIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKTtcbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGJvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1zaGlwcy1tb2RhbFwiKTtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXZpZXdTaGlwKGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBwc3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBycCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVQcmV2aWV3KGksIGRpcmVjdGlvbiwgbGVuZ3RoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwc3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBkcCk7XG4gICAgICAgICAgICBwc3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJwKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkaXNwbGF5UHJldmlldyhpbmRleCwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoIC0gMTsgaisrKSB7XG5cdFx0XHRcdFx0aWYgKGluZGV4IC0gMTA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgXHRwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuXHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRpZihwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QuY29udGFpbnMoXCJob3ZlclwiKSl7XG4gICAgICAgICAgICAgICAgICAgIFx0cHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuXHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRpZihpbmRleCAtMTAgPj0gMCl7XG4gICAgICAgICAgICAgICAgICAgIFx0cHNwb3RzWyhpbmRleCAtPSAxMCldLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcblx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTtcbiIsIlxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgICBsZXQgbWV0YSA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbW92ZXM6IFtdLFxuICAgIH1cblxuICBcbiAgICBsZXQgbW92ZUFycmF5ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSArKyl7XG4gICAgICAgIG1vdmVBcnJheS5wdXNoKGkpXG4gICAgfVxuICAgIGZ1bmN0aW9uIHNodWZmbGVBcnJheShhcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaHVmZmxlQXJyYXkobW92ZUFycmF5KVxuICAgIGxldCB0dXJuTnVtYmVyID0gMFxuXG4gICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuICAgICAgICBsZXQgY3VycmVudFR1cm4gPSB0dXJuTnVtYmVyXG4gICAgICAgIHR1cm5OdW1iZXIrPTFcblxuICAgICAgICByZXR1cm4gbW92ZUFycmF5W2N1cnJlbnRUdXJuXVxuICAgIH1cbiAgICAvKlxuICAgIGNvbnN0IEFJID0gKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICAqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcmFuZG9tTW92ZSxcbiAgICB9XG59XG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiY29uc3Qgc2hpcCA9IChsZW5ndGgsIHNwb3QpID0+IHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gXG4gICAgbGV0IGhpdHMgPSBbXTtcbiAgICBjb25zdCBoaXQgPSAoaGl0TG9jYXRpb24pID0+IHtcbiAgICAgICAgaGl0cy5wdXNoKHtcbiAgICAgICAgICAgIGhpdExvY2F0aW9uXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGhpdHMubGVuZ3RoID09IGxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2hpdCwgaGl0cywgbGVuZ3RoLCBpc1N1bmssIGlkfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgc2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ0lmIHlvdSBzZWUgbWUuLi4nKVxuXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBpbml0aWFsaXplQm9hcmQgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIlxuaW1wb3J0IHBsYXlHYW1lIGZyb20gXCIuL2dhbWVjb250cm9sXCI7XG5cblxucGxheUdhbWUoKVxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=