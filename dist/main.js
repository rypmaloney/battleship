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
	let currentPreviewLength= 5;

  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("computer");
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("human");
  const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("player");
  const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("computer");

  const computerDomBoard = document.getElementById("computer-board");
  const playerDomBoard = document.getElementById("player-board");
  const placeDomBoard = document.getElementById("place-board")

  const directionBtn = document.getElementById("switch-d");
  directionBtn.addEventListener("click", function(){
	//displayPlaceBoard()
	switchd()

	let placeSpots = document.querySelectorAll(".place")
			//add event listener to add ship to player board, then display new board
		for(let i=0; i<placeSpots.length; i++){
			placeSpots[i].addEventListener("click", function(){
				playerGameboard.placeShip(i, currentPreviewLength, shipDirection)
				displayPlaceBoard()
				placeSub()
				})}
		previewShip(currentPreviewLength, shipDirection)

  });



  const rotateBtn = document.getElementById("rotate");
  rotateBtn.addEventListener("click", () => rotateMyShips());

  function switchd(){
	  if (shipDirection === "x"){
		  return shipDirection = "y"
		}else return shipDirection = "x"
  }

  //two test ships
  playerGameboard.placeShip(50, 2, "x");
  playerGameboard.placeShip(75, 2, "y");
  computerGameboard.placeShip(50, 4, "x");
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
        spot.setAttribute("class", "miss ");
      }

      playerDomBoard.appendChild(spot);

    }
	selectShipsWalkThrough()


  }

  function displayPlaceBoard(){
	removeChildNodes(placeDomBoard)
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



	function selectShipsWalkThrough(){
		displayPlaceBoard()

		
		placeCarrier()
		function placeCarrier(){
			let placeSpots = document.querySelectorAll(".place")
			updatePlaceLog("carrier")
			//add event listener to add ship to player board, then display new board
			for(let i=0; i<placeSpots.length; i++){
				placeSpots[i].addEventListener("click", function(){
					playerGameboard.placeShip(i, 5, shipDirection)
					displayPlaceBoard()
					placeFrigate()
				})
				
			}
			previewShip(5,shipDirection)
			}

		function placeFrigate(){
				currentPreviewLength = 4
				let placeSpots = document.querySelectorAll(".place")
				updatePlaceLog("frigate")
				//add event listener to add ship to player board, then display new board
				for(let i=0; i<placeSpots.length; i++){
					placeSpots[i].addEventListener("click", function(){
						playerGameboard.placeShip(i, 4, shipDirection)
						displayPlaceBoard()
						placeCruiser()
					})
					
				}
				previewShip(4,shipDirection)
				}
			
		function placeCruiser(){
			currentPreviewLength = 3
			let placeSpots = document.querySelectorAll(".place")
			updatePlaceLog("cruiser")
			//add event listener to add ship to player board, then display new board
			for(let i=0; i<placeSpots.length; i++){
				placeSpots[i].addEventListener("click", function(){
					playerGameboard.placeShip(i, 3, shipDirection)
					displayPlaceBoard()
					placeSub()
					})
				}
				previewShip(3,shipDirection)
				}

		function placeSub(){
			currentPreviewLength = 3
			let placeSpots = document.querySelectorAll(".place")
			updatePlaceLog("Submarine")
			//add event listener to add ship to player board, then display new board
			for(let i=0; i<placeSpots.length; i++){
				placeSpots[i].addEventListener("click", function(){
					playerGameboard.placeShip(i, 3, shipDirection)
					displayPlaceBoard()
					closeModal()
				})
			}
			previewShip(3,shipDirection)
			}
	}

}

function updatePlaceLog(ship){
	let log = document.getElementById("place-log");
	log.innerHTML= `<h3> Place a ${ship}</h3>`
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
function openModal(){

    modal.style.display ='block';

    window.onclick = function(event) {
        if (event.target == about) {
          modal.style.display = "none";
        }
      }
}


function closeModal(){
    let modal = document.getElementById('place-ships-modal');
        modal.style.display = "none";
}




function previewShip(length, direction) {

  let pspots = document.querySelectorAll(".place");


  for (let i = 0; i < pspots.length; i++) {
    let dp = function(){displayPreview(i, direction,length)}
    let rp = function(){removePreview(i, direction, length)}
    pspots[i].addEventListener("mouseover", dp 
    );
    pspots[i].addEventListener("mouseout", rp
    );
  }
  function displayPreview(index, direction, length) {
	  
    if (direction == "x") {
      pspots[index].classList.add('hover')
      for(let j =0; j < length - 1; j ++){
          pspots[index+j].classList.add('hover')
      }
    }else{
        pspots[index].classList.add('hover')
        for(let j =0; j < length -1; j ++){
            pspots[index-=10].classList.add('hover')
        }
    }
  }

  function removePreview(index, direction, length) {
    if (direction == "x") {
      pspots[index].classList.remove('hover')
      for(let j =0; j < length; j ++){
          pspots[index+j].classList.remove('hover')
      }
    }else{
        pspots[index].classList.remove('hover')
        for(let j =0; j < length; j ++){
            pspots[index-=10].classList.remove('hover')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ25aeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDL0NyQjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUEsQ0FBMEI7QUFDSTtBQUNNO0FBQ087QUFDTjs7O0FBR3JDLHFEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgLy9pbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2FtZWJvYXJkXG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgcGxheWVyTmFtZTogcGxheWVyLFxuICAgIHNoaXBzOiBbXSxcbiAgICBtaXNzZWRIaXRzOiBbXSxcbiAgfTtcbiAgLy9jcmVhdGlvbiBvZiB0aGUgZ2FtZWJvYXJkIHRocm91Z2ggbG9vcGluZzsgMTB4MTA7IHVzZSBib2FyZFt4XVt5XSB0byByZWZlcmVuY2UgYSBzcGFjZVxuICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgYm9hcmQucHVzaCh7XG4gICAgICAgIHNoaXA6IGZhbHNlLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgbWlzc2VkSGl0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gIC8vQm9hcmQgZ2l2ZXRoXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgLy9cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgXG4gICAgXG4gICAgXG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YDtcbiAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuXG4gICAgbWV0YS5zaGlwcy5wdXNoKHNoaXAobGVuZ3RoLHNwb3QpKTtcblxuICAgIC8vZm9yIHZlcnRpY2FsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhzcG90KSB7XG4gICAgaWYgKGJvYXJkW3Nwb3RdLmlkICE9IG51bGwpIHtcbiAgICAgIC8vdXBkYXRlIHRoZSBib2FyZFxuICAgICAgYm9hcmRbc3BvdF0uaGl0ID0gdHJ1ZTtcblxuICAgICAgLy9maW5kIHRoZSBpZCBvZiB0aGUgYm9hdCBhdCB0aGF0IGxvY2F0aW9uIGluIHRoZSBtZXRhLnNoaXBzIGFycmF5XG4gICAgICBsZXQgaW5kZXggPSBtZXRhLnNoaXBzLm1hcCgoZSkgPT4gZS5pZCkuaW5kZXhPZihib2FyZFtzcG90XS5pZCk7XG5cbiAgICAgIC8vaGl0IHRoYXQgYm9hdCBhdCB0aGUgbG9jYXRpb25cbiAgICAgIG1ldGEuc2hpcHNbaW5kZXhdLmhpdChzcG90KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0YS5taXNzZWRIaXRzLnB1c2goc3BvdCk7XG4gICAgICBib2FyZFtzcG90XS5taXNzZWRIaXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgbWV0YSxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgfTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuLyogU3RlcHM6XG4gICAgMS4gSW5pdGlhbGl6ZSBnYW1lYm9hcmQgeFxuICAgIDIuIENvbXB1dGVyIHBpY2tzIHJhbmRvbSBzaGlwc1xuICAgIDMuIFBsYXllciBwbGFjZXMgdGhlaXIgc2hpcHM6XG4gICAgICAgIDEuXG4gICAgNC4gVHVybnMgYmVnaW4uIEVhY2ggdHVybiBjb25zaXRzIG9mOlxuICAgICAgICAxLiBjaG9vc2luZyBzcG90IHJ1bm5pZ24gY29tcHV0ZXJCb2FyZC5yZWNlaXZlKHNwb3QpXG4gICAgICAgIDIuIFN3aXRjaCB0dXJuXG5cblxuVG8gZG86IFxuICAgIDEuIE1ha2UgYWJpbGl0eSB0byBwbGFjZSBzaGlwcyBob3Jpem9udGFsbHlcbiAgICAyLiBjcmVhdGUgcmFuZG9tIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcbiAgICAyLiBcbiovXG5cblxuXG5mdW5jdGlvbiByb3RhdGVNeVNoaXBzKCkge1xuICBpZiAoc2hpcERpcmVjdGlvbiA9PSBcInlcIikge1xuICAgIGxldCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGlzcGxheS12ZXJ0aWNhbFwiKTtcbiAgICBjb25zb2xlLmxvZyhzaGlwcyk7XG4gICAgbGV0IHJvdGF0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm90YXRhYmxlXCIpO1xuICAgIHJvdGF0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvdGF0YWJsZS1jb2x1bW5cIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgc2hpcHNbaV0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkaXNwbGF5LWhvcml6b250YWxcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ4XCIpO1xuICB9IGVsc2UgaWYgKHNoaXBEaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXktaG9yaXpvbnRhbFwiKTtcbiAgICBsZXQgcm90YXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGFibGVcIik7XG4gICAgcm90YXRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm90YXRhYmxlLXJvd1wiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAtZGlzcGxheSBkaXNwbGF5LXZlcnRpY2FsXCIpO1xuICAgIH1cblxuICAgIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcblx0bGV0IHNoaXBEaXJlY3Rpb24gPSBcInhcIjtcblx0bGV0IGN1cnJlbnRQcmV2aWV3TGVuZ3RoPSA1O1xuXG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGNvbnN0IGh1bWFuUGxheWVyID0gcGxheWVyKFwiaHVtYW5cIik7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbiAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJjb21wdXRlclwiKTtcblxuICBjb25zdCBjb21wdXRlckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbiAgY29uc3QgcGxhY2VEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtYm9hcmRcIilcblxuICBjb25zdCBkaXJlY3Rpb25CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN3aXRjaC1kXCIpO1xuICBkaXJlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdC8vZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRzd2l0Y2hkKClcblxuXHRsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIilcblx0XHRcdC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuXHRcdGZvcihsZXQgaT0wOyBpPHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0cGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCBjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbilcblx0XHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRcdFx0XHRwbGFjZVN1YigpXG5cdFx0XHRcdH0pfVxuXHRcdHByZXZpZXdTaGlwKGN1cnJlbnRQcmV2aWV3TGVuZ3RoLCBzaGlwRGlyZWN0aW9uKVxuXG4gIH0pO1xuXG5cblxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0ZVwiKTtcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiByb3RhdGVNeVNoaXBzKCkpO1xuXG4gIGZ1bmN0aW9uIHN3aXRjaGQoKXtcblx0ICBpZiAoc2hpcERpcmVjdGlvbiA9PT0gXCJ4XCIpe1xuXHRcdCAgcmV0dXJuIHNoaXBEaXJlY3Rpb24gPSBcInlcIlxuXHRcdH1lbHNlIHJldHVybiBzaGlwRGlyZWN0aW9uID0gXCJ4XCJcbiAgfVxuXG4gIC8vdHdvIHRlc3Qgc2hpcHNcbiAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgMiwgXCJ4XCIpO1xuICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDc1LCAyLCBcInlcIik7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgXCJ4XCIpO1xuICBpbml0aWFsaXplQm9hcmQoKTtcblxuXG5cblxuXG4gIGZ1bmN0aW9uIHN3aXRjaFR1cm4oKSB7XG4gICAgaWYgKHR1cm4gPT0gXCJwbGF5ZXJcIikge1xuICAgICAgcmV0dXJuICh0dXJuID0gXCJjb21wdXRlclwiKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdHVybiA9IFwicGxheWVyXCI7XG4gIGZ1bmN0aW9uIHBsYXllclR1cm4oZSwgb3Bwb3NpdGlvbkJvYXJkKSB7XG4gICAgb3Bwb3NpdGlvbkJvYXJkLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuaWQpKTtcbiAgICB1cGRhdGVDb21wdXRlckJvYXJkKGUpO1xuICAgIHN3aXRjaFR1cm4oKTtcbiAgICBjb21wdXRlclR1cm4oKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gY29tcHV0ZXJUdXJuKCkge1xuICAgIGxldCBzZWxlY3Rpb24gPSBjb21wdXRlclBsYXllci5yYW5kb21Nb3ZlKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soc2VsZWN0aW9uKTtcbiAgICB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pO1xuICB9XG5cblxuXG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCkge1xuICAgIC8vQ3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgaSk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBjb21wdXRlci1zcG90XCIpO1xuXG4gICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICBjb21wdXRlckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuICAgIH1cbiAgICAvL2NyZWF0ZSBwbGF5ZXIgYm9hcmRcbiAgICBsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwXCIpO1xuICAgICAgaWYgKHBib2FyZFtpXS5zaGlwID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzIFwiKTtcbiAgICAgIH1cblxuICAgICAgcGxheWVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG5cbiAgICB9XG5cdHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKVxuXG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCl7XG5cdHJlbW92ZUNoaWxkTm9kZXMocGxhY2VEb21Cb2FyZClcblx0bGV0IHBsYWNlQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwIHBsYWNlXCIpO1xuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzIFwiKTtcbiAgICAgIH1cblxuICAgICAgcGxhY2VEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG4gIH1cblxuXG5cblx0ZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpe1xuXHRcdGRpc3BsYXlQbGFjZUJvYXJkKClcblxuXHRcdFxuXHRcdHBsYWNlQ2FycmllcigpXG5cdFx0ZnVuY3Rpb24gcGxhY2VDYXJyaWVyKCl7XG5cdFx0XHRsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIilcblx0XHRcdHVwZGF0ZVBsYWNlTG9nKFwiY2FycmllclwiKVxuXHRcdFx0Ly9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIHNoaXBEaXJlY3Rpb24pXG5cdFx0XHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRcdFx0XHRcdHBsYWNlRnJpZ2F0ZSgpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdFx0cHJldmlld1NoaXAoNSxzaGlwRGlyZWN0aW9uKVxuXHRcdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcGxhY2VGcmlnYXRlKCl7XG5cdFx0XHRcdGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gNFxuXHRcdFx0XHRsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIilcblx0XHRcdFx0dXBkYXRlUGxhY2VMb2coXCJmcmlnYXRlXCIpXG5cdFx0XHRcdC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuXHRcdFx0XHRmb3IobGV0IGk9MDsgaTxwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0XHRwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0cGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCA0LCBzaGlwRGlyZWN0aW9uKVxuXHRcdFx0XHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRcdFx0XHRcdFx0cGxhY2VDcnVpc2VyKClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdHByZXZpZXdTaGlwKDQsc2hpcERpcmVjdGlvbilcblx0XHRcdFx0fVxuXHRcdFx0XG5cdFx0ZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCl7XG5cdFx0XHRjdXJyZW50UHJldmlld0xlbmd0aCA9IDNcblx0XHRcdGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKVxuXHRcdFx0dXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpXG5cdFx0XHQvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcblx0XHRcdGZvcihsZXQgaT0wOyBpPHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbilcblx0XHRcdFx0XHRkaXNwbGF5UGxhY2VCb2FyZCgpXG5cdFx0XHRcdFx0cGxhY2VTdWIoKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cHJldmlld1NoaXAoMyxzaGlwRGlyZWN0aW9uKVxuXHRcdFx0XHR9XG5cblx0XHRmdW5jdGlvbiBwbGFjZVN1Yigpe1xuXHRcdFx0Y3VycmVudFByZXZpZXdMZW5ndGggPSAzXG5cdFx0XHRsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIilcblx0XHRcdHVwZGF0ZVBsYWNlTG9nKFwiU3VibWFyaW5lXCIpXG5cdFx0XHQvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcblx0XHRcdGZvcihsZXQgaT0wOyBpPHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbilcblx0XHRcdFx0XHRkaXNwbGF5UGxhY2VCb2FyZCgpXG5cdFx0XHRcdFx0Y2xvc2VNb2RhbCgpXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHRwcmV2aWV3U2hpcCgzLHNoaXBEaXJlY3Rpb24pXG5cdFx0XHR9XG5cdH1cblxufVxuXG5mdW5jdGlvbiB1cGRhdGVQbGFjZUxvZyhzaGlwKXtcblx0bGV0IGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtbG9nXCIpO1xuXHRsb2cuaW5uZXJIVE1MPSBgPGgzPiBQbGFjZSBhICR7c2hpcH08L2gzPmBcbn1cblxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgICB3aGlsZSAocGFyZW50LmNoaWxkcmVuWzBdKSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuY2hpbGRyZW5bMF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmlkO1xuXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgbGV0IGNzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5kZXgpO1xuICAgIGlmIChjYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwXCIpO1xuICAgIH1cbiAgICBpZiAoY2JvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgfVxuICAgIGlmIChjYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlUGxheWVyQm9hcmQoc2VsZWN0aW9uKSB7XG4gICAgbGV0IGluZGV4ID0gc2VsZWN0aW9uO1xuXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuXG4gICAgbGV0IHBzcG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHAke2luZGV4fWApO1xuICAgIGlmIChwYm9hcmRbaW5kZXhdLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgfVxuICAgIGlmIChwYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICB9XG4gICAgaWYgKHBib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICB9XG59XG5cbiAgXG5cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBvcGVuTW9kYWwoKXtcblxuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSdibG9jayc7XG5cbiAgICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gYWJvdXQpIHtcbiAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbn1cblxuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCl7XG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWNlLXNoaXBzLW1vZGFsJyk7XG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuXG5cblxuZnVuY3Rpb24gcHJldmlld1NoaXAobGVuZ3RoLCBkaXJlY3Rpb24pIHtcblxuICBsZXQgcHNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcblxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGRwID0gZnVuY3Rpb24oKXtkaXNwbGF5UHJldmlldyhpLCBkaXJlY3Rpb24sbGVuZ3RoKX1cbiAgICBsZXQgcnAgPSBmdW5jdGlvbigpe3JlbW92ZVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpfVxuICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGRwIFxuICAgICk7XG4gICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycFxuICAgICk7XG4gIH1cbiAgZnVuY3Rpb24gZGlzcGxheVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG5cdCAgXG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpXG4gICAgICBmb3IobGV0IGogPTA7IGogPCBsZW5ndGggLSAxOyBqICsrKXtcbiAgICAgICAgICBwc3BvdHNbaW5kZXgral0uY2xhc3NMaXN0LmFkZCgnaG92ZXInKVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJylcbiAgICAgICAgZm9yKGxldCBqID0wOyBqIDwgbGVuZ3RoIC0xOyBqICsrKXtcbiAgICAgICAgICAgIHBzcG90c1tpbmRleC09MTBdLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJylcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpXG4gICAgICBmb3IobGV0IGogPTA7IGogPCBsZW5ndGg7IGogKyspe1xuICAgICAgICAgIHBzcG90c1tpbmRleCtqXS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpXG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKVxuICAgICAgICBmb3IobGV0IGogPTA7IGogPCBsZW5ndGg7IGogKyspe1xuICAgICAgICAgICAgcHNwb3RzW2luZGV4LT0xMF0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuLypcblxuLy90d28gdGVzdCBzaGlwc1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgJ3gnKVxucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg3NSwgMiwgJ3knKVxuY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCAneCcpXG5cblxuLy90ZXN0aW5nIGhpdCBhbmQgbWlzc1xucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soNDApXG5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjaygyMylcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCl7XG4gICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIGZvciAobGV0IGk9MCA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnaWQnLCBpKVxuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKVxuXG4gICAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBpZihwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXAgXCIpfVxuICAgICAgICBpZihwYm9hcmRbaV0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0IFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcIm1pc3MgXCIpfVxuICAgICAgIFxuICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwYm9hcmQpXG59XG4qL1xuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJcbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICBmdW5jdGlvbiB0dXJuKHNwb3Qpe1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcbiAgICAgICAgbGV0IHggPSAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcblxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgbWV0YS5tb3Zlcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICBpZih4ID09PSBtZXRhLm1vdmVzW2ldKXtcbiAgICAgICAgICAgICAgICB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICBcblxuICAgICAgICBtZXRhLm1vdmVzLnB1c2goeClcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZUJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCJcbmltcG9ydCBwbGF5R2FtZSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9