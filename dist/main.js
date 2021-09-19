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





const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("computer");
const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("human");
const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("player");
const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("computer");

function playGame() {
    //Initial state for placement preview and game start
    let shipDirection = "x";
    let currentPreviewLength = 5;
    let turn = "player";
	let placeShipIndex = 0
	let placementArray =  computerPlayer.makeRandomArray(100)

    // DOM
    const log = document.getElementById("log");
    const computerDomBoard = document.getElementById("computer-board");
    const playerDomBoard = document.getElementById("player-board");
    const placeDomBoard = document.getElementById("place-board");
	const winner = document.getElementById("winner")
	const gameEndModal = document.getElementById("game-end")
	const reset = document.getElementById('reset')
	const directionBtn = document.getElementById("switch-d");
	
	//reset button for end game
	reset.addEventListener("click", ()=> window.location.reload())


	//sets initial boards up
    initializeBoard();


	//places computer ships
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
        
        directionBtn.addEventListener("click", () => switchDirectionReturn())
            

		function switchDirectionReturn(){
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
        
		}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsS0FBSztBQUM3QjtBQUNBOztBQUVBLHdCQUF3Qiw4Q0FBSTs7QUFFNUI7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsZ0JBQWdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeklLO0FBQ007Ozs7QUFJcEMsdUJBQXVCLGdEQUFNO0FBQzdCLG9CQUFvQixnREFBTTtBQUMxQix3QkFBd0IsbURBQVM7QUFDakMsMEJBQTBCLG1EQUFTOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQyxtREFBbUQsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQSx3Q0FBd0MsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLEtBQUs7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnREFBZ0QsTUFBTTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFdUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcGFPO0FBQ1Y7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDbER0QjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7OztBQUdBLENBQTJEOzs7QUFHM0Qsc0RBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgICBjb25zdCBtZXRhID0ge1xuICAgICAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgICAgIHNoaXBzOiBbXSxcbiAgICAgICAgbWlzc2VkSGl0czogW10sXG4gICAgICAgIGhpdHM6IFtdLFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICB9O1xuICAgIC8vY3JlYXRpb24gb2YgdGhlIGdhbWVib2FyZCB0aHJvdWdoIGxvb3BpbmdcbiAgICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0Zvcldpbm5lcigpIHtcbiAgICAgICAgaWYgKG1ldGEuaGl0cy5sZW5ndGggPT09IDE3KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQm9hcmQgZ2l2ZXRoXG4gICAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAgIC8vXG4gICAgZnVuY3Rpb24gY2hlY2tQbGFjZW1lbnQoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICAgIGxldCBnb0ZvclkgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoc3BvdCAtIChsZW5ndGggLSAxKSAqIDEwIDwgMCkge1xuICAgICAgICAgICAgICAgIGdvRm9yWSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnb0ZvclkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzcG90ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbc3BvdF0uc2hpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3RjaHlhIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvRm9yWSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNwb3QgLT0gMTA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnb0ZvclkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5b3UgY2FuJ3QgZG8gdGhhdCFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGdvRm9yWCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwb3QgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3Nwb3RdLnNoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvRm9yWCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc3BvdCAlIDEwID09PSAwIHx8IHNwb3QgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZ29Gb3JYID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ29Gb3JYID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91IGNhbid0IGRvIHRoYXQhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlU2hpcChzcG90LCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgICAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcblxuICAgICAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsIHNwb3QpKTtcblxuICAgICAgICAvL2ZvciB2ZXJ0aWNhbCBzaGlwc1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzcG90IC09IDEwO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIHNwb3QgKz0gMTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhzcG90KSB7XG4gICAgICAgIGlmIChib2FyZFtzcG90XS5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvL3VwZGF0ZSB0aGUgYm9hcmRcbiAgICAgICAgICAgIGJvYXJkW3Nwb3RdLmhpdCA9IHRydWU7XG4gICAgICAgICAgICBtZXRhLnN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAvL2ZpbmQgdGhlIGlkIG9mIHRoZSBib2F0IGF0IHRoYXQgbG9jYXRpb24gaW4gdGhlIG1ldGEuc2hpcHMgYXJyYXlcbiAgICAgICAgICAgIGxldCBpbmRleCA9IG1ldGEuc2hpcHMubWFwKChlKSA9PiBlLmlkKS5pbmRleE9mKGJvYXJkW3Nwb3RdLmlkKTtcblxuICAgICAgICAgICAgLy9oaXQgdGhhdCBib2F0IGF0IHRoZSBsb2NhdGlvblxuICAgICAgICAgICAgbWV0YS5zaGlwc1tpbmRleF0uaGl0KHNwb3QpO1xuICAgICAgICAgICAgbWV0YS5oaXRzLnB1c2goc3BvdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXRhLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIG1ldGEubWlzc2VkSGl0cy5wdXNoKHNwb3QpO1xuICAgICAgICAgICAgYm9hcmRbc3BvdF0ubWlzc2VkSGl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEJvYXJkLFxuICAgICAgICBtZXRhLFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGNoZWNrRm9yV2lubmVyLFxuICAgICAgICBjaGVja1BsYWNlbWVudCxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkO1xuIiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cblxuXG5jb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xuY29uc3QgaHVtYW5QbGF5ZXIgPSBwbGF5ZXIoXCJodW1hblwiKTtcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbmNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICAgIC8vSW5pdGlhbCBzdGF0ZSBmb3IgcGxhY2VtZW50IHByZXZpZXcgYW5kIGdhbWUgc3RhcnRcbiAgICBsZXQgc2hpcERpcmVjdGlvbiA9IFwieFwiO1xuICAgIGxldCBjdXJyZW50UHJldmlld0xlbmd0aCA9IDU7XG4gICAgbGV0IHR1cm4gPSBcInBsYXllclwiO1xuXHRsZXQgcGxhY2VTaGlwSW5kZXggPSAwXG5cdGxldCBwbGFjZW1lbnRBcnJheSA9ICBjb21wdXRlclBsYXllci5tYWtlUmFuZG9tQXJyYXkoMTAwKVxuXG4gICAgLy8gRE9NXG4gICAgY29uc3QgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dcIik7XG4gICAgY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gICAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbiAgICBjb25zdCBwbGFjZURvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1ib2FyZFwiKTtcblx0Y29uc3Qgd2lubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5uZXJcIilcblx0Y29uc3QgZ2FtZUVuZE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLWVuZFwiKVxuXHRjb25zdCByZXNldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpXG5cdGNvbnN0IGRpcmVjdGlvbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3dpdGNoLWRcIik7XG5cdFxuXHQvL3Jlc2V0IGJ1dHRvbiBmb3IgZW5kIGdhbWVcblx0cmVzZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKVxuXG5cblx0Ly9zZXRzIGluaXRpYWwgYm9hcmRzIHVwXG4gICAgaW5pdGlhbGl6ZUJvYXJkKCk7XG5cblxuXHQvL3BsYWNlcyBjb21wdXRlciBzaGlwc1xuXHRwbGFjZVJhbmRvbVNoaXBzKDUpXG4gICAgcGxhY2VSYW5kb21TaGlwcyg0KTtcbiAgICBwbGFjZVJhbmRvbVNoaXBzKDMpO1xuICAgIHBsYWNlUmFuZG9tU2hpcHMoMyk7XG4gICAgcGxhY2VSYW5kb21TaGlwcygyKTtcblx0XG5cbiAgICBmdW5jdGlvbiBwbGFjZVJhbmRvbVNoaXBzKGxlbmd0aCkge1xuXHRcdGxldCBwbGFjZWQgPSBmYWxzZVxuXHRcdHdoaWxlIChwbGFjZWQgPT09IGZhbHNlKXtcblx0XHRcdGxldCByYW5kb21EID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cdFx0XHRsZXQgZGlyZWN0aW9uID0gXCJ4XCI7XG5cdFx0XHRpZiAocmFuZG9tRCA9PT0gMSkge1xuXHRcdFx0XHRkaXJlY3Rpb24gPSBcInlcIjtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYgKGNvbXB1dGVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KHBsYWNlbWVudEFycmF5W3BsYWNlU2hpcEluZGV4XSwgbGVuZ3RoLCBkaXJlY3Rpb24pKSB7XG5cdFx0XHRcdGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcChwbGFjZW1lbnRBcnJheVtwbGFjZVNoaXBJbmRleF0sIGxlbmd0aCwgZGlyZWN0aW9uKTtcblx0XHRcdFx0cGxhY2VkID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGxhY2VTaGlwSW5kZXggKz0xXG5cdFx0XHRcdFxuXHRcdFx0fVxuXG5cdFx0fVxuXG4gICAgfVxuXG4gICAgLy9Td2l0Y2hpbmcgdGhlIGRpcmVjdGlvbiBvZiBzaGlwcyBmb3IgcHJldmlld3NcbiAgICBmdW5jdGlvbiBzd2l0Y2hkKCkge1xuICAgICAgICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieVwiKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieFwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzd2l0Y2hUdXJuKCkge1xuICAgICAgICBpZiAodHVybiA9PSBcInBsYXllclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gKHR1cm4gPSBcImNvbXB1dGVyXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheWVyVHVybihlLCBvcHBvc2l0aW9uQm9hcmQpIHtcbiAgICAgICAgb3Bwb3NpdGlvbkJvYXJkLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuaWQpKTtcbiAgICAgICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChlKTtcbiAgICAgICAgc3dpdGNoVHVybigpO1xuXHRcdGlmIChjb21wdXRlckdhbWVib2FyZC5jaGVja0Zvcldpbm5lcigpKSB7XG5cdFx0XHRnYW1lRW5kTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICAgICAgd2lubmVyLmlubmVyVGV4dCA9IFwiWW91IFdPTiFcIlxuICAgICAgICB9ZWxzZSBpZiAoY29tcHV0ZXJHYW1lYm9hcmQubWV0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJZb3UgaGl0IHRoZSBjb21wdXRlcidzIHNoaXAhXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2cuaW5uZXJUZXh0ID0gXCJZb3UgbWlzc2VkLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjb21wdXRlclR1cm4oKSwgNTAwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlclR1cm4oKSB7XG4gICAgICAgIGxldCBzZWxlY3Rpb24gPSBjb21wdXRlclBsYXllci5yYW5kb21Nb3ZlKCk7XG4gICAgICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHNlbGVjdGlvbik7XG4gICAgICAgIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbik7XG4gICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tGb3JXaW5uZXIoKSkge1xuXHRcdFx0Z2FtZUVuZE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICAgICAgICAgIHdpbm5lci5pbm5lclRleHQgPSBcIllvdSBsb3N0IHRvIGEgbWFjaGluZS5cIlxuICAgICAgICB9IGVsc2UgaWYgKHBsYXllckdhbWVib2FyZC5tZXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxvZy5pbm5lclRleHQgPSBcIlRoZSBDb21wdXRlciBoaXQgeW91ciBzaGlwIVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9nLmlubmVyVGV4dCA9IFwiVGhlIENvbXB1dGVyIG1pc3NlZC5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vVXBkYXRlcyBwbGF5ZXJib2FyZCBiYXNlZCBvbiBzaGlwIHBsYWNlbWVudHMgaW4gcGxhY2VtZW50IHByZXZpZXdcbiAgICAvLy0tIGRvZXMgbm90IHJlbWFrZSB0aGUgYm9hcmQgZXZlcnkgdGltZSFcbiAgICBmdW5jdGlvbiBzZXRQbGF5ZXJCb2FyZCgpIHtcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aX1gKTtcblxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9DcmVhdGVzIGluaXRpYWwgYm9hcmQgc3RhdGUgYmVmb3JlIHBsYXllciBwbGFjZXMgc2hpcHMuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgICAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT5cbiAgICAgICAgICAgICAgICBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICAgICAgfVxuICAgICAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICAgICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcCR7aX1gKTtcbiAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHBcIik7XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXllckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKTtcbiAgICB9XG5cbiAgICAvL1NldHMgdXAgcHJldmlldyBib2FyZCBmb3IgcGxheSB0byBwbGFjZSBzaGlwc1xuICAgIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCkge1xuICAgICAgICByZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpO1xuICAgICAgICBsZXQgcGxhY2VCb2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcCBwbGFjZVwiKTtcbiAgICAgICAgICAgIGlmIChwbGFjZUJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYWNlQm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYWNlRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2JlZ2lucyB0aGUgd2Fsa3Rocm91Z2ggcHJvY2VzcyBmb3IgcGxhY2luZyBzaGlwc1xuICAgIC8vc2VwYXJhdGUgZnVuY3Rpb24gZm9yIGVhY2ggc2hpcCB0eXBlXG4gICAgZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQbGFjZVNoaXAgPSBcImNhcnJpZXJcIjtcbiAgICAgICAgXG4gICAgICAgIGRpcmVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc3dpdGNoRGlyZWN0aW9uUmV0dXJuKCkpXG4gICAgICAgICAgICBcblxuXHRcdGZ1bmN0aW9uIHN3aXRjaERpcmVjdGlvblJldHVybigpe1xuXHRcdFx0c3dpdGNoZCgpO1xuICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcblxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGxhY2VTaGlwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImNhcnJpZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJmcmlnYXRlXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY3J1aXNlclwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZUNydWlzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZVN1YigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGF0cm9sXCI6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlUGF0cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcChjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIFxuXHRcdH1cblxuXG4gICAgICAgIGRpc3BsYXlQbGFjZUJvYXJkKCk7XG5cbiAgICAgICAgcGxhY2VDYXJyaWVyKCk7XG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlQ2FycmllcigpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY2FycmllclwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDUsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiZnJpZ2F0ZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ2FycmllcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCg1LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlRnJpZ2F0ZSgpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNDtcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiZnJpZ2F0ZVwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDQsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDQsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlQ3J1aXNlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBsYWNlU2hpcCA9IFwiY3J1aXNlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlRnJpZ2F0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCg0LCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlQ3J1aXNlcigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiY3J1aXNlclwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDMsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGxhY2VTaGlwID0gXCJzdWJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYXllckJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZUNydWlzZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlld1NoaXAoMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwbGFjZVN1YigpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gMztcbiAgICAgICAgICAgIGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcbiAgICAgICAgICAgIHVwZGF0ZVBsYWNlTG9nKFwiU3VibWFyaW5lXCIpO1xuICAgICAgICAgICAgLy9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tQbGFjZW1lbnQoaSwgMywgc2hpcERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5UGxhY2VCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VQYXRyb2woKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQbGFjZVNoaXAgPSBcInBhdHJvbFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGxheWVyQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlU3ViKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZpZXdTaGlwKDMsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBsYWNlUGF0cm9sKCkge1xuICAgICAgICAgICAgY3VycmVudFByZXZpZXdMZW5ndGggPSAyO1xuICAgICAgICAgICAgbGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuICAgICAgICAgICAgdXBkYXRlUGxhY2VMb2coXCJQYXRyb2wgQm9hdFwiKTtcbiAgICAgICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyR2FtZWJvYXJkLmNoZWNrUGxhY2VtZW50KGksIDIsIHNoaXBEaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDIsIHNoaXBEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVBsYWNlQm9hcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsYXllckJvYXJkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZVBhdHJvbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2aWV3U2hpcCgyLCBzaGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYWNlTG9nKHNoaXApIHtcbiAgICAgICAgbGV0IGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtbG9nXCIpO1xuICAgICAgICBsb2cuaW5uZXJIVE1MID0gYDxoMz4gUGxhY2UgYSAke3NoaXB9PC9oMz5gO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUNoaWxkTm9kZXMocGFyZW50KSB7XG4gICAgICAgIHdoaWxlIChwYXJlbnQuY2hpbGRyZW5bMF0pIHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuY2hpbGRyZW5bMF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5pZDtcblxuICAgICAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICAgICAgbGV0IGNzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5kZXgpO1xuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2JvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gc2VsZWN0aW9uO1xuXG4gICAgICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcblxuICAgICAgICBsZXQgcHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aW5kZXh9YCk7XG4gICAgICAgIGlmIChwYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICAgICAgICBsZXQgcGxhY2VNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtbW9kYWxcIik7XG4gICAgICAgIHBsYWNlTW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXZpZXdTaGlwKGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBwc3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZHAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBycCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVQcmV2aWV3KGksIGRpcmVjdGlvbiwgbGVuZ3RoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwc3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBkcCk7XG4gICAgICAgICAgICBwc3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHJwKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkaXNwbGF5UHJldmlldyhpbmRleCwgZGlyZWN0aW9uLCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5hZGQoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoIC0gMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAtIDEwID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBzcG90c1soaW5kZXggLT0gMTApXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBzcG90c1tpbmRleCArIGpdLmNsYXNzTGlzdC5jb250YWlucyhcImhvdmVyXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwc3BvdHNbaW5kZXggKyBqXS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyXCIpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IC0gMTAgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHNwb3RzWyhpbmRleCAtPSAxMCldLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgcGxheUdhbWUsIGNvbXB1dGVyR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgY29tcHV0ZXJHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFrZVJhbmRvbUFycmF5KG51bWJlcikge1xuICAgICAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXI7IGkrKykge1xuICAgICAgICAgICBhcnJheS5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNodWZmbGVBcnJheShhcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaHVmZmxlQXJyYXkoYXJyYXkpO1xuICAgICAgICByZXR1cm4gYXJyYXlcbiAgICB9XG5cblxuICAgIGxldCBtb3ZlQXJyYXkgPSBtYWtlUmFuZG9tQXJyYXkoMTAwKTtcbiAgICBsZXQgdHVybk51bWJlciA9IDA7XG5cbiAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCkge1xuICAgICAgICBsZXQgY3VycmVudFR1cm4gPSB0dXJuTnVtYmVyO1xuICAgICAgICB0dXJuTnVtYmVyICs9IDE7XG5cbiAgICAgICAgcmV0dXJuIG1vdmVBcnJheVtjdXJyZW50VHVybl07XG4gICAgfVxuXG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgICAgIG1ha2VSYW5kb21BcnJheSxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyO1xuIiwiY29uc3Qgc2hpcCA9IChsZW5ndGgsIHNwb3QpID0+IHtcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gXG4gICAgbGV0IGhpdHMgPSBbXTtcbiAgICBjb25zdCBoaXQgPSAoaGl0TG9jYXRpb24pID0+IHtcbiAgICAgICAgaGl0cy5wdXNoKHtcbiAgICAgICAgICAgIGhpdExvY2F0aW9uXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGhpdHMubGVuZ3RoID09IGxlbmd0aCl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2hpdCwgaGl0cywgbGVuZ3RoLCBpc1N1bmssIGlkfVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgc2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc29sZS5sb2coJ0lmIHlvdSBzZWUgbWUuLi4nKVxuXG5cbmltcG9ydCB7IHBsYXlHYW1lLCBjb21wdXRlckdhbWVib2FyZH0gZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIjtcblxuXG5wbGF5R2FtZSgpXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==