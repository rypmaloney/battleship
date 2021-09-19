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
                if (spot % 10 === 0 || spot > 100) {
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
	const winner = document.getElementById("winner")
	const gameEndModal = document.getElementById("game-end")
	const reset = document.getElementById('reset')

	reset.addEventListener("click", ()=> window.location.reload())



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
			gameEndModal.style.display = "block"
            winner.innerText = "You WON!"
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
			gameEndModal.style.display = "block"
            winner.innerText = "You lost to a machine."
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
        let placeModal = document.getElementById("place-modal");
        placeModal.style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsS0FBSztBQUM3QjtBQUNBOztBQUVBLHdCQUF3Qiw4Q0FBSTs7QUFFNUI7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pJSztBQUNNO0FBQ1Y7O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixnREFBTTtBQUM3QixvQkFBb0IsZ0RBQU07QUFDMUIsd0JBQXdCLG1EQUFTO0FBQ2pDLDBCQUEwQixtREFBUzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQyxtREFBbUQsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQSx3Q0FBd0MsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLEtBQUs7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0QsTUFBTTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFdUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdGFPO0FBQ1Y7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbER0QjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7OztBQUdBLENBQTJEOzs7QUFHM0Qsc0RBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgICBjb25zdCBtZXRhID0ge1xuICAgICAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgICAgIHNoaXBzOiBbXSxcbiAgICAgICAgbWlzc2VkSGl0czogW10sXG4gICAgICAgIGhpdHM6IFtdLFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICB9O1xuICAgIC8vY3JlYXRpb24gb2YgdGhlIGdhbWVib2FyZCB0aHJvdWdoIGxvb3BpbmdcbiAgICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0Zvcldpbm5lcigpIHtcbiAgICAgICAgaWYgKG1ldGEuaGl0cy5sZW5ndGggPT09IDE3KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQm9hcmQgZ2l2ZXRoXG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIC8vXG4gICAgZnVuY3Rpb24gY2hlY2tQbGFjZW1lbnQoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICAgIGxldCBnb0ZvclkgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoc3BvdCAtIChsZW5ndGggLSAxKSAqIDEwIDwgMCkge1xuICAgICAgICAgICAgICAgIGdvRm9yWSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnb0ZvclkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzcG90ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbc3BvdF0uc2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3RjaHlhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvRm9yWSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnb0ZvclkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2FuJ3QgZG8gdGhhdCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGdvRm9yWCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwb3QgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3Nwb3RdLnNoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvRm9yWCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc3BvdCAlIDEwID09PSAwIHx8IHNwb3QgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ29Gb3JYID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ29Gb3JYID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNhbid0IGRvIHRoYXQhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlU2hpcChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcblxuICAgICAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsIHNwb3QpKTtcblxuICAgICAgICAvL2ZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzcG90IC09IDEwO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhzcG90KSB7XG4gICAgICAgIGlmIChib2FyZFtzcG90XS5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL3VwZGF0ZSB0aGUgYm9hcmRcbiAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmhpdCA9IHRydWU7XG4gICAgICAgICAgICBtZXRhLnN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAvL2ZpbmQgdGhlIGlkIG9mIHRoZSBib2F0IGF0IHRoYXQgbG9jYXRpb24gaW4gdGhlIG1ldGEuc2hpcHMgYXJyYXlcbiAgICAgICAgICAgIGxldCBpbmRleCA9IG1ldGEuc2hpcHMubWFwKChlKSA9PiBlLmlkKS5pbmRleE9mKGJvYXJkW3Nwb3RdLmlkKTtcblxuICAgICAgICAgICAgLy9oaXQgdGhhdCBib2F0IGF0IHRoZSBsb2NhdGlvblxuICAgICAgICAgICAgbWV0YS5zaGlwc1tpbmRleF0uaGl0KHNwb3QpO1xuICAgICAgICAgICAgbWV0YS5oaXRzLnB1c2goc3BvdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXRhLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIG1ldGEubWlzc2VkSGl0cy5wdXNoKHNwb3QpO1xuICAgICAgICAgICAgYm9hcmRbc3BvdF0ubWlzc2VkSGl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEJvYXJkLFxuICAgICAgICBtZXRhLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGNoZWNrRm9yV2lubmVyLFxuICAgICAgICBjaGVja1BsYWNlbWVudCxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbi8qIFxuVG8gZG86IFxuXG5cdDIuIE1ha2UgZGlzcGF5IGZvciB3aW4gY29uZGl0aW9uc1xuICAgIDMuIG1vdmUgbG9naWMgZm9yIHNoaXAgcGxhY2VtZW50IG9rIGludG8gb3duIGZ1bmN0aW9uXG4gICAgNC4gY2xlYW4gdXAgY29kZVxuXHQ1LiBtYWtlIGFpIHNtYXJ0ZXJcblx0Ni4gbW92ZSBnYW1lIHdpbiBjb25kaXRpb25zIHRvIHNvbWV3aGVyZSBlbHNlPyAgXG4qL1xuXG5jb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xuY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoXCJodW1hblwiKTtcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbmNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICAgIC8vSW5pdGlhbCBzdGF0ZSBmb3IgcGxhY2VtZW50IHByZXZpZXcgYW5kIGdhbWUgc3RhcnRcbiAgICBsZXQgc2hpcERpcmVjdGlvbiA9IFwieFwiO1xuICAgIGxldCBjdXJyZW50UHJldmlld0xlbmd0aCA9IDU7XG4gICAgbGV0IHR1cm4gPSBcInBsYXllclwiO1xuXG4gICAgLy8gRE9NXG5cbiAgICBjb25zdCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ1wiKTtcbiAgICBjb25zdCBjb21wdXRlckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgICBjb25zdCBwbGF5ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyLWJvYXJkXCIpO1xuICAgIGNvbnN0IHBsYWNlRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWJvYXJkXCIpO1xuXHRjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbm5lclwiKVxuXHRjb25zdCBnYW1lRW5kTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtZW5kXCIpXG5cdGNvbnN0IHJlc2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0JylcblxuXHRyZXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCkpXG5cblxuXG4gICAgaW5pdGlhbGl6ZUJvYXJkKCk7XG5cblx0bGV0IHBsYWNlU2hpcEluZGV4ID0gMFxuXHRsZXQgcGxhY2VtZW50QXJyYXkgPSAgY29tcHV0ZXJQbGF5ZXIubWFrZVJhbmRvbUFycmF5KDEwMClcblxuXHRwbGFjZVJhbmRvbVNoaXBzKDUpXG4gICAgcGxhY2VSYW5kb21TaGlwcyg0KTtcbiAgICBwbGFjZVJhbmRvbVNoaXBzKDMpO1xuICAgIHBsYWNlUmFuZG9tU2hpcHMoMyk7XG4gICAgcGxhY2VSYW5kb21TaGlwcygyKTtcblx0XG5cbiAgICBmdW5jdGlvbiBwbGFjZVJhbmRvbVNoaXBzKGxlbmd0aCkge1xuXHRcdGxldCBwbGFjZWQgPSBmYWxzZVxuXHRcdHdoaWxlIChwbGFjZWQgPT09IGZhbHNlKXtcblx0XHRcdGxldCByYW5kb21EID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cdFx0XHRsZXQgZGlyZWN0aW9uID0gXCJ4XCI7XG5cdFx0XHRpZiAocmFuZG9tRCA9PT0gMSkge1xuXHRcdFx0XHRkaXJlY3Rpb24gPSBcInlcIjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKGNvbXB1dGVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KHBsYWNlbWVudEFycmF5W3BsYWNlU2hpcEluZGV4XSwgbGVuZ3RoLCBkaXJlY3Rpb24pKSB7XG5cdFx0XHRcdGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcChwbGFjZW1lbnRBcnJheVtwbGFjZVNoaXBJbmRleF0sIGxlbmd0aCwgZGlyZWN0aW9uKTtcblx0XHRcdFx0cGxhY2VkID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGxhY2VTaGlwSW5kZXggKz0xXG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0fVxuXG4gICAgfVxuXG4gICAgLy9Td2l0Y2hpbmcgdGhlIGRpcmVjdGlvbiBvZiBzaGlwcyBmb3IgcHJldmlld3NcbiAgICBmdW5jdGlvbiBzd2l0Y2hkKCkge1xuICAgICAgICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieVwiKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieFwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hUdXJuKCkge1xuICAgICAgICBpZiAodHVybiA9PSBcInBsYXllclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gKHR1cm4gPSBcImNvbXB1dGVyXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheWVyVHVybihlLCBvcHBvc2l0aW9uQm9hcmQpIHtcbiAgICAgICAgb3Bwb3NpdGlvbkJvYXJkLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuaWQpKTtcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChlKTtcbiAgICAgICAgc3dpdGNoVHVybigpO1xuXHRcdGlmIChjb21wdXRlckdhbWVib2FyZC5jaGVja0Zvcldpbm5lcigpKSB7XG5cdFx0XHRnYW1lRW5kTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICAgICAgd2lubmVyLmlubmVyVGV4dCA9IFwiWW91IFdPTiFcIlxuICAgICAgICB9ZWxzZSBpZiAoY29tcHV0ZXJHYW1lYm9hcmQubWV0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJZb3UgaGl0IHRoZSBjb21wdXRlcidzIHNoaXAhXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJZb3UgbWlzc2VkLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb21wdXRlclR1cm4oKSwgNTAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlclR1cm4oKSB7XG4gICAgICAgIGxldCBzZWxlY3Rpb24gPSBjb21wdXRlclBsYXllci5yYW5kb21Nb3ZlKCk7XG4gICAgICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHNlbGVjdGlvbik7XG4gICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbik7XG4gICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tGb3JXaW5uZXIoKSkge1xuXHRcdFx0Z2FtZUVuZE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICAgICAgICAgIHdpbm5lci5pbm5lclRleHQgPSBcIllvdSBsb3N0IHRvIGEgbWFjaGluZS5cIlxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllckdhbWVib2FyZC5tZXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBDb21wdXRlciBoaXQgeW91ciBzaGlwIVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiVGhlIENvbXB1dGVyIG1pc3NlZC5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vVXBkYXRlcyBwbGF5ZXJib2FyZCBiYXNlZCBvbiBzaGlwIHBsYWNlbWVudHMgaW4gcGxhY2VtZW50IHByZXZpZXdcbiAgICAvLy0tIGRvZXMgbm90IHJlbWFrZSB0aGUgYm9hcmQgZXZlcnkgdGltZSFcbiAgICBmdW5jdGlvbiBzZXRQbGF5ZXJCb2FyZCgpIHtcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aX1gKTtcblxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9DcmVhdGVzIGluaXRpYWwgYm9hcmQgc3RhdGUgYmVmb3JlIHBsYXllciBwbGFjZXMgc2hpcHMuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgICAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT5cbiAgICAgICAgICAgICAgICBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcCR7aX1gKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHBcIik7XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXllckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKTtcbiAgICB9XG5cbiAgICAvL1NldHMgdXAgcHJldmlldyBib2FyZCBmb3IgcGxheSB0byBwbGFjZSBzaGlwc1xuICAgIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCkge1xuICAgICAgICByZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpO1xuICAgICAgICBsZXQgcGxhY2VCb2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcCBwbGFjZVwiKTtcbiAgICAgICAgICAgIGlmIChwbGFjZUJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlQm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JlZ2lucyB0aGUgd2Fsa3Rocm91Z2ggcHJvY2VzcyBmb3IgcGxhY2luZyBzaGlwc1xuICAgIC8vc2VwYXJhdGUgZnVuY3Rpb24gZm9yIGVhY2ggc2hpcCB0eXBlXG4gICAgZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQbGFjZVNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2gtZFwiKTtcbiAgICAgICAgZGlyZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzd2l0Y2hkKCk7XG4gICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRQbGFjZVNoaXApIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FycmllclwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZyaWdhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjcnVpc2VyXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwYXRyb2xcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VQYXRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKGN1cnJlbnRQcmV2aWV3TGVuZ3RoLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgICAgICBwbGFjZUNhcnJpZXIoKTtcbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDYXJyaWVyKCkge1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjYXJyaWVyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgNSwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNSwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJmcmlnYXRlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VGcmlnYXRlKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSA0O1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJmcmlnYXRlXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgNCwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgNCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VDcnVpc2VyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJjcnVpc2VyXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VGcmlnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMywgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInN1YlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCgzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlU3ViKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAzO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJTdWJtYXJpbmVcIik7XG4gICAgICAgICAgICAvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2VTcG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckdhbWVib2FyZC5jaGVja1BsYWNlbWVudChpLCAzLCBzaGlwRGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCAzLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZVBhdHJvbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwicGF0cm9sXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRQbGF5ZXJCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VTdWIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcGxhY2VQYXRyb2woKSB7XG4gICAgICAgICAgICBjdXJyZW50UHJldmlld0xlbmd0aCA9IDI7XG4gICAgICAgICAgICBsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG4gICAgICAgICAgICB1cGRhdGVQbGFjZUxvZyhcIlBhdHJvbCBCb2F0XCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMiwgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMiwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDIsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxhY2VMb2coc2hpcCkge1xuICAgICAgICBsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG4gICAgICAgIGxvZy5pbm5lckhUTUwgPSBgPGgzPiBQbGFjZSBhICR7c2hpcH08L2gzPmA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJCb2FyZChlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBsZXQgY3Nwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleCk7XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuICAgICAgICBsZXQgaW5kZXggPSBzZWxlY3Rpb247XG5cbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG4gICAgICAgIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKTtcbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGJvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XG4gICAgICAgIGxldCBwbGFjZU1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1tb2RhbFwiKTtcbiAgICAgICAgcGxhY2VNb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJldmlld1NoaXAobGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHBzcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwc3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5UHJldmlldyhpLCBkaXJlY3Rpb24sIGxlbmd0aCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IHJwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGRwKTtcbiAgICAgICAgICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcnApO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGRpc3BsYXlQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IC0gMTAgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHNwb3RzWyhpbmRleCAtPSAxMCldLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHNwb3RzW2luZGV4ICsgal0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaG92ZXJcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggLSAxMCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwc3BvdHNbKGluZGV4IC09IDEwKV0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBwbGF5R2FtZSwgY29tcHV0ZXJHYW1lYm9hcmQgfTtcbiIsImltcG9ydCBjb21wdXRlckdhbWVib2FyZCBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY29uc3QgcGxheWVyID0gKG5hbWUpID0+IHtcbiAgICBsZXQgbWV0YSA9IHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgbW92ZXM6IFtdLFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlUmFuZG9tQXJyYXkobnVtYmVyKSB7XG4gICAgICAgIGxldCBhcnJheSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlcjsgaSsrKSB7XG4gICAgICAgICAgIGFycmF5LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2h1ZmZsZUFycmF5KGFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgICAgICAgICBbYXJyYXlbaV0sIGFycmF5W2pdXSA9IFthcnJheVtqXSwgYXJyYXlbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNodWZmbGVBcnJheShhcnJheSk7XG4gICAgICAgIHJldHVybiBhcnJheVxuICAgIH1cblxuXG4gICAgbGV0IG1vdmVBcnJheSA9IG1ha2VSYW5kb21BcnJheSgxMDApO1xuICAgIGxldCB0dXJuTnVtYmVyID0gMDtcblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKSB7XG4gICAgICAgIGxldCBjdXJyZW50VHVybiA9IHR1cm5OdW1iZXI7XG4gICAgICAgIHR1cm5OdW1iZXIgKz0gMTtcblxuICAgICAgICByZXR1cm4gbW92ZUFycmF5W2N1cnJlbnRUdXJuXTtcbiAgICB9XG5cbiAgICAvKlxuICAgIGNvbnN0IEFJID0gKCkgPT4ge1xuICAgICAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG5cbiAgICAgICAgfVxuICAgIH1cbiAgICAqL1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWV0YSxcbiAgICAgICAgcmFuZG9tTW92ZSxcbiAgICAgICAgbWFrZVJhbmRvbUFycmF5LFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7XG4iLCJjb25zdCBzaGlwID0gKGxlbmd0aCwgc3BvdCkgPT4ge1xuICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWBcbiAgICBsZXQgaGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdCA9IChoaXRMb2NhdGlvbikgPT4ge1xuICAgICAgICBoaXRzLnB1c2goe1xuICAgICAgICAgICAgaGl0TG9jYXRpb25cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAoaGl0cy5sZW5ndGggPT0gbGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7aGl0LCBoaXRzLCBsZW5ndGgsIGlzU3VuaywgaWR9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBzaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZygnSWYgeW91IHNlZSBtZS4uLicpXG5cblxuaW1wb3J0IHsgcGxheUdhbWUsIGNvbXB1dGVyR2FtZWJvYXJkfSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9