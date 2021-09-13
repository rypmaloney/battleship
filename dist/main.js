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

let shipDirection = "x";
let currentPreviewLength= 5;

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
  const computerPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("computer");
  const humanPlayer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.default)("human");
  const playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("player");
  const computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)("computer");

  const computerDomBoard = document.getElementById("computer-board");
  const playerDomBoard = document.getElementById("player-board");
  const placeDomBoard = document.getElementById("place-board")

  const directionBtn = document.getElementById("switch-d");
  directionBtn.addEventListener("click", function(){
	switchd()
	displayPlaceBoard()
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
	selectShipsWalkThrough("frigate", 5)


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
					playerGameboard.placeShip(i, 5, shipDirection),
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
						playerGameboard.placeShip(i, 4, shipDirection),
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
					playerGameboard.placeShip(i, 3, shipDirection),
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
					playerGameboard.placeShip(i, 3, shipDirection),
					displayPlaceBoard()
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
    let about = document.getElementById('aboutModal');
        about.style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDL0NyQjtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOzs7O0FBSUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDdEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUEsQ0FBMEI7QUFDSTtBQUNNO0FBQ087QUFDTjs7O0FBR3JDLHFEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lY29udHJvbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGdhbWVib2FyZCA9IChwbGF5ZXIpID0+IHtcbiAgLy9pbmZvcm1hdGlvbiBhYm91dCB0aGUgZ2FtZWJvYXJkXG4gIGNvbnN0IG1ldGEgPSB7XG4gICAgcGxheWVyTmFtZTogcGxheWVyLFxuICAgIHNoaXBzOiBbXSxcbiAgICBtaXNzZWRIaXRzOiBbXSxcbiAgfTtcbiAgLy9jcmVhdGlvbiBvZiB0aGUgZ2FtZWJvYXJkIHRocm91Z2ggbG9vcGluZzsgMTB4MTA7IHVzZSBib2FyZFt4XVt5XSB0byByZWZlcmVuY2UgYSBzcGFjZVxuICBsZXQgYm9hcmQgPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwMDsgeCsrKSB7XG4gICAgYm9hcmQucHVzaCh7XG4gICAgICAgIHNoaXA6IGZhbHNlLFxuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgbWlzc2VkSGl0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gIC8vQm9hcmQgZ2l2ZXRoXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgLy9cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNwb3QsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgXG4gICAgXG4gICAgXG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YDtcbiAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuXG4gICAgbWV0YS5zaGlwcy5wdXNoKHNoaXAobGVuZ3RoLHNwb3QpKTtcblxuICAgIC8vZm9yIHZlcnRpY2FsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCAtPSAxMDtcbiAgICAgICAgYm9hcmRbc3BvdF0uc2hpcCA9IHRydWU7XG4gICAgICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy9Ib3Jpem9udGFsIHNoaXBzXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpe1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgc3BvdCArPSAxO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhzcG90KSB7XG4gICAgaWYgKGJvYXJkW3Nwb3RdLmlkICE9IG51bGwpIHtcbiAgICAgIC8vdXBkYXRlIHRoZSBib2FyZFxuICAgICAgYm9hcmRbc3BvdF0uaGl0ID0gdHJ1ZTtcblxuICAgICAgLy9maW5kIHRoZSBpZCBvZiB0aGUgYm9hdCBhdCB0aGF0IGxvY2F0aW9uIGluIHRoZSBtZXRhLnNoaXBzIGFycmF5XG4gICAgICBsZXQgaW5kZXggPSBtZXRhLnNoaXBzLm1hcCgoZSkgPT4gZS5pZCkuaW5kZXhPZihib2FyZFtzcG90XS5pZCk7XG5cbiAgICAgIC8vaGl0IHRoYXQgYm9hdCBhdCB0aGUgbG9jYXRpb25cbiAgICAgIG1ldGEuc2hpcHNbaW5kZXhdLmhpdChzcG90KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0YS5taXNzZWRIaXRzLnB1c2goc3BvdCk7XG4gICAgICBib2FyZFtzcG90XS5taXNzZWRIaXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0Qm9hcmQsXG4gICAgbWV0YSxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgfTtcbn07XG5cblxuXG5cblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBnYW1lYm9hcmQ7XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuLyogU3RlcHM6XG4gICAgMS4gSW5pdGlhbGl6ZSBnYW1lYm9hcmQgeFxuICAgIDIuIENvbXB1dGVyIHBpY2tzIHJhbmRvbSBzaGlwc1xuICAgIDMuIFBsYXllciBwbGFjZXMgdGhlaXIgc2hpcHM6XG4gICAgICAgIDEuXG4gICAgNC4gVHVybnMgYmVnaW4uIEVhY2ggdHVybiBjb25zaXRzIG9mOlxuICAgICAgICAxLiBjaG9vc2luZyBzcG90IHJ1bm5pZ24gY29tcHV0ZXJCb2FyZC5yZWNlaXZlKHNwb3QpXG4gICAgICAgIDIuIFN3aXRjaCB0dXJuXG5cblxuVG8gZG86IFxuICAgIDEuIE1ha2UgYWJpbGl0eSB0byBwbGFjZSBzaGlwcyBob3Jpem9udGFsbHlcbiAgICAyLiBjcmVhdGUgcmFuZG9tIHBsYWNlbWVudCBmb3IgY29tcHV0ZXJcbiAgICAyLiBcbiovXG5cbmxldCBzaGlwRGlyZWN0aW9uID0gXCJ4XCI7XG5sZXQgY3VycmVudFByZXZpZXdMZW5ndGg9IDU7XG5cbmZ1bmN0aW9uIHJvdGF0ZU15U2hpcHMoKSB7XG4gIGlmIChzaGlwRGlyZWN0aW9uID09IFwieVwiKSB7XG4gICAgbGV0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXNwbGF5LXZlcnRpY2FsXCIpO1xuICAgIGNvbnNvbGUubG9nKHNoaXBzKTtcbiAgICBsZXQgcm90YXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3RhdGFibGVcIik7XG4gICAgcm90YXRhYmxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicm90YXRhYmxlLWNvbHVtblwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzaGlwc1tpXS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImRpc3BsYXktaG9yaXpvbnRhbFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInhcIik7XG4gIH0gZWxzZSBpZiAoc2hpcERpcmVjdGlvbiA9PSBcInhcIikge1xuICAgIGxldCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGlzcGxheS1ob3Jpem9udGFsXCIpO1xuICAgIGxldCByb3RhdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0YWJsZVwiKTtcbiAgICByb3RhdGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3RhdGFibGUtcm93XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcC1kaXNwbGF5IGRpc3BsYXktdmVydGljYWxcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIChzaGlwRGlyZWN0aW9uID0gXCJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICBjb25zdCBjb21wdXRlclBsYXllciA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xuICBjb25zdCBodW1hblBsYXllciA9IHBsYXllcihcImh1bWFuXCIpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJwbGF5ZXJcIik7XG4gIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG5cbiAgY29uc3QgY29tcHV0ZXJEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYXllckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXItYm9hcmRcIik7XG4gIGNvbnN0IHBsYWNlRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWJvYXJkXCIpXG5cbiAgY29uc3QgZGlyZWN0aW9uQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzd2l0Y2gtZFwiKTtcbiAgZGlyZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRzd2l0Y2hkKClcblx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRwcmV2aWV3U2hpcChjdXJyZW50UHJldmlld0xlbmd0aCwgc2hpcERpcmVjdGlvbilcblxuICB9KTtcblxuXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm90YXRlXCIpO1xuICByb3RhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHJvdGF0ZU15U2hpcHMoKSk7XG5cbiAgZnVuY3Rpb24gc3dpdGNoZCgpe1xuXHQgIGlmIChzaGlwRGlyZWN0aW9uID09PSBcInhcIil7XG5cdFx0ICByZXR1cm4gc2hpcERpcmVjdGlvbiA9IFwieVwiXG5cdFx0fWVsc2UgcmV0dXJuIHNoaXBEaXJlY3Rpb24gPSBcInhcIlxuICB9XG5cbiAgLy90d28gdGVzdCBzaGlwc1xuICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCAyLCBcInhcIik7XG4gIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNzUsIDIsIFwieVwiKTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCBcInhcIik7XG4gIGluaXRpYWxpemVCb2FyZCgpO1xuXG5cblxuXG5cbiAgZnVuY3Rpb24gc3dpdGNoVHVybigpIHtcbiAgICBpZiAodHVybiA9PSBcInBsYXllclwiKSB7XG4gICAgICByZXR1cm4gKHR1cm4gPSBcImNvbXB1dGVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIGxldCB0dXJuID0gXCJwbGF5ZXJcIjtcbiAgZnVuY3Rpb24gcGxheWVyVHVybihlLCBvcHBvc2l0aW9uQm9hcmQpIHtcbiAgICBvcHBvc2l0aW9uQm9hcmQucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5pZCkpO1xuICAgIHVwZGF0ZUNvbXB1dGVyQm9hcmQoZSk7XG4gICAgc3dpdGNoVHVybigpO1xuICAgIGNvbXB1dGVyVHVybigpO1xuICB9XG5cblxuICBmdW5jdGlvbiBjb21wdXRlclR1cm4oKSB7XG4gICAgbGV0IHNlbGVjdGlvbiA9IGNvbXB1dGVyUGxheWVyLnJhbmRvbU1vdmUoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzZWxlY3Rpb24pO1xuICAgIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbik7XG4gIH1cblxuXG5cblxuICBmdW5jdGlvbiBpbml0aWFsaXplQm9hcmQoKSB7XG4gICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IGNvbXB1dGVyLXNwb3RcIik7XG5cbiAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBwbGF5ZXJUdXJuKGUsIGNvbXB1dGVyR2FtZWJvYXJkKSk7XG5cbiAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgfVxuICAgIC8vY3JlYXRlIHBsYXllciBib2FyZFxuICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcCR7aX1gKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzcG90IHBcIik7XG4gICAgICBpZiAocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBib2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYm9hcmRbaV0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3MgXCIpO1xuICAgICAgfVxuXG4gICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcblxuICAgIH1cblx0c2VsZWN0U2hpcHNXYWxrVGhyb3VnaChcImZyaWdhdGVcIiwgNSlcblxuXG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5UGxhY2VCb2FyZCgpe1xuXHRyZW1vdmVDaGlsZE5vZGVzKHBsYWNlRG9tQm9hcmQpXG5cdGxldCBwbGFjZUJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGBwJHtpfWApO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcCBwbGFjZVwiKTtcbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwIHBsYWNlXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uaGl0ID09IHRydWUpIHtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdCBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICB9XG5cbiAgICAgIHBsYWNlRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdCk7XG4gICAgfVxuICB9XG5cblxuXG5cdGZ1bmN0aW9uIHNlbGVjdFNoaXBzV2Fsa1Rocm91Z2goKXtcblx0XHRkaXNwbGF5UGxhY2VCb2FyZCgpXG5cblx0XHRcblx0XHRwbGFjZUNhcnJpZXIoKVxuXHRcdGZ1bmN0aW9uIHBsYWNlQ2Fycmllcigpe1xuXHRcdFx0bGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpXG5cdFx0XHR1cGRhdGVQbGFjZUxvZyhcImNhcnJpZXJcIilcblx0XHRcdC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuXHRcdFx0Zm9yKGxldCBpPTA7IGk8cGxhY2VTcG90cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0cGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCA1LCBzaGlwRGlyZWN0aW9uKSxcblx0XHRcdFx0XHRkaXNwbGF5UGxhY2VCb2FyZCgpXG5cdFx0XHRcdFx0cGxhY2VGcmlnYXRlKClcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XHRwcmV2aWV3U2hpcCg1LHNoaXBEaXJlY3Rpb24pXG5cdFx0XHR9XG5cblx0XHRmdW5jdGlvbiBwbGFjZUZyaWdhdGUoKXtcblx0XHRcdFx0Y3VycmVudFByZXZpZXdMZW5ndGggPSA0XG5cdFx0XHRcdGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKVxuXHRcdFx0XHR1cGRhdGVQbGFjZUxvZyhcImZyaWdhdGVcIilcblx0XHRcdFx0Ly9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG5cdFx0XHRcdGZvcihsZXQgaT0wOyBpPHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDQsIHNoaXBEaXJlY3Rpb24pLFxuXHRcdFx0XHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRcdFx0XHRcdFx0cGxhY2VDcnVpc2VyKClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdHByZXZpZXdTaGlwKDQsc2hpcERpcmVjdGlvbilcblx0XHRcdFx0fVxuXHRcdFx0XG5cdFx0ZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCl7XG5cdFx0XHRjdXJyZW50UHJldmlld0xlbmd0aCA9IDNcblx0XHRcdGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKVxuXHRcdFx0dXBkYXRlUGxhY2VMb2coXCJjcnVpc2VyXCIpXG5cdFx0XHQvL2FkZCBldmVudCBsaXN0ZW5lciB0byBhZGQgc2hpcCB0byBwbGF5ZXIgYm9hcmQsIHRoZW4gZGlzcGxheSBuZXcgYm9hcmRcblx0XHRcdGZvcihsZXQgaT0wOyBpPHBsYWNlU3BvdHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRwbGFjZVNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoaSwgMywgc2hpcERpcmVjdGlvbiksXG5cdFx0XHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRcdFx0XHRcdHBsYWNlU3ViKClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHByZXZpZXdTaGlwKDMsc2hpcERpcmVjdGlvbilcblx0XHRcdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcGxhY2VTdWIoKXtcblx0XHRcdGN1cnJlbnRQcmV2aWV3TGVuZ3RoID0gM1xuXHRcdFx0bGV0IHBsYWNlU3BvdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlXCIpXG5cdFx0XHR1cGRhdGVQbGFjZUxvZyhcIlN1Ym1hcmluZVwiKVxuXHRcdFx0Ly9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIHNoaXBEaXJlY3Rpb24pLFxuXHRcdFx0XHRcdGRpc3BsYXlQbGFjZUJvYXJkKClcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdHByZXZpZXdTaGlwKDMsc2hpcERpcmVjdGlvbilcblx0XHRcdH1cblx0fVxuXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYWNlTG9nKHNoaXApe1xuXHRsZXQgbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGFjZS1sb2dcIik7XG5cdGxvZy5pbm5lckhUTUw9IGA8aDM+IFBsYWNlIGEgJHtzaGlwfTwvaDM+YFxufVxuXG5cblxuXG5mdW5jdGlvbiByZW1vdmVDaGlsZE5vZGVzKHBhcmVudCkge1xuICAgIHdoaWxlIChwYXJlbnQuY2hpbGRyZW5bMF0pIHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5jaGlsZHJlblswXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJCb2FyZChlKSB7XG4gICAgbGV0IGluZGV4ID0gZS50YXJnZXQuaWQ7XG5cbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBsZXQgY3Nwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpbmRleCk7XG4gICAgaWYgKGNib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXBcIik7XG4gICAgfVxuICAgIGlmIChjYm9hcmRbaW5kZXhdLmhpdCA9PSB0cnVlKSB7XG4gICAgICBjc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpdFwiKTtcbiAgICB9XG4gICAgaWYgKGNib2FyZFtpbmRleF0ubWlzc2VkSGl0ID09IHRydWUpIHtcbiAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzc1wiKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVQbGF5ZXJCb2FyZChzZWxlY3Rpb24pIHtcbiAgICBsZXQgaW5kZXggPSBzZWxlY3Rpb247XG5cbiAgICBsZXQgcGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCk7XG5cbiAgICBsZXQgcHNwb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcCR7aW5kZXh9YCk7XG4gICAgaWYgKHBib2FyZFtpbmRleF0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNoaXAgcFwiKTtcbiAgICB9XG4gICAgaWYgKHBib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgIH1cbiAgICBpZiAocGJvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgIH1cbn1cblxuICBcblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIG9wZW5Nb2RhbCgpe1xuXG4gICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9J2Jsb2NrJztcblxuICAgIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBhYm91dCkge1xuICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgfVxufVxuXG5cbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKXtcbiAgICBsZXQgYWJvdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWJvdXRNb2RhbCcpO1xuICAgICAgICBhYm91dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cblxuXG5cbmZ1bmN0aW9uIHByZXZpZXdTaGlwKGxlbmd0aCwgZGlyZWN0aW9uKSB7XG5cbiAgbGV0IHBzcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIik7XG5cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBzcG90cy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBkcCA9IGZ1bmN0aW9uKCl7ZGlzcGxheVByZXZpZXcoaSwgZGlyZWN0aW9uLGxlbmd0aCl9XG4gICAgbGV0IHJwID0gZnVuY3Rpb24oKXtyZW1vdmVQcmV2aWV3KGksIGRpcmVjdGlvbiwgbGVuZ3RoKX1cbiAgICBwc3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBkcCBcbiAgICApO1xuICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgcnBcbiAgICApO1xuICB9XG4gIGZ1bmN0aW9uIGRpc3BsYXlQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnaG92ZXInKVxuICAgICAgZm9yKGxldCBqID0wOyBqIDwgbGVuZ3RoIC0gMTsgaiArKyl7XG4gICAgICAgICAgcHNwb3RzW2luZGV4K2pdLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJylcbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpXG4gICAgICAgIGZvcihsZXQgaiA9MDsgaiA8IGxlbmd0aCAtMTsgaiArKyl7XG4gICAgICAgICAgICBwc3BvdHNbaW5kZXgtPTEwXS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpXG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVQcmV2aWV3KGluZGV4LCBkaXJlY3Rpb24sIGxlbmd0aCkge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gXCJ4XCIpIHtcbiAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKVxuICAgICAgZm9yKGxldCBqID0wOyBqIDwgbGVuZ3RoOyBqICsrKXtcbiAgICAgICAgICBwc3BvdHNbaW5kZXgral0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJylcbiAgICAgICAgZm9yKGxldCBqID0wOyBqIDwgbGVuZ3RoOyBqICsrKXtcbiAgICAgICAgICAgIHBzcG90c1tpbmRleC09MTBdLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJylcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG5cbi8qXG5cbi8vdHdvIHRlc3Qgc2hpcHNcbnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDQsICd4JylcbnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNzUsIDIsICd5JylcbmNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgJ3gnKVxuXG5cbi8vdGVzdGluZyBoaXQgYW5kIG1pc3NcbnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKDQwKVxucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soMjMpXG5cbmZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpe1xuICAgIC8vQ3JlYXRlIGNvbXB1dGVyIGJvYXJkXG4gICAgbGV0IGNib2FyZCA9IGNvbXB1dGVyR2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICBmb3IgKGxldCBpPTAgOyBpIDwgY2JvYXJkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IHNwb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2lkJywgaSlcbiAgICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzcG90IGNvbXB1dGVyLXNwb3RcIilcblxuICAgICAgICBzcG90LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKT0+IHBsYXllclR1cm4oZSwgY29tcHV0ZXJHYW1lYm9hcmQpKTtcblxuICAgICAgICBjb21wdXRlckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpXG4gICAgfVxuICAgIC8vY3JlYXRlIHBsYXllciBib2FyZFxuICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIGZvciAobGV0IGk9MCA7IGkgPCBwYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnaWQnLCBpKVxuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3RcIilcbiAgICAgICAgaWYocGJvYXJkW2ldLnNoaXAgPT0gdHJ1ZSl7c3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJzaGlwIFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2ldLmhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcImhpdCBcIil9XG4gICAgICAgIGlmKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSl7c3BvdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgXCJtaXNzIFwiKX1cbiAgICAgICBcbiAgICAgICAgcGxheWVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICB9XG4gICAgY29uc29sZS5sb2cocGJvYXJkKVxufVxuKi9cbmV4cG9ydCBkZWZhdWx0IHBsYXlHYW1lO1xuIiwiXG5jb25zdCBwbGF5ZXIgPSAobmFtZSkgPT4ge1xuICAgIGxldCBtZXRhID0ge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBtb3ZlczogW10sXG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gdHVybihzcG90KXtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByYW5kb21Nb3ZlKCl7XG4gICAgICAgIGxldCB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wIDsgaSA8IG1ldGEubW92ZXMubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgaWYoeCA9PT0gbWV0YS5tb3Zlc1tpXSl7XG4gICAgICAgICAgICAgICAgeCA9ICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgICAgXG5cbiAgICAgICAgbWV0YS5tb3Zlcy5wdXNoKHgpXG4gICAgICAgIHJldHVybiB4XG4gICAgfVxuICAgIC8qXG4gICAgY29uc3QgQUkgPSAoKSA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcblxuICAgICAgICB9XG4gICAgfVxuICAgICovXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBtZXRhLFxuICAgICAgICByYW5kb21Nb3ZlLFxuICAgIH1cbn1cblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJjb25zdCBzaGlwID0gKGxlbmd0aCwgc3BvdCkgPT4ge1xuICAgIGxldCBpZCA9IGBzaGlwJHtzcG90fWBcbiAgICBsZXQgaGl0cyA9IFtdO1xuICAgIGNvbnN0IGhpdCA9IChoaXRMb2NhdGlvbikgPT4ge1xuICAgICAgICBoaXRzLnB1c2goe1xuICAgICAgICAgICAgaGl0TG9jYXRpb25cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAoaGl0cy5sZW5ndGggPT0gbGVuZ3RoKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7aGl0LCBoaXRzLCBsZW5ndGgsIGlzU3VuaywgaWR9XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBzaGlwO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZygnSWYgeW91IHNlZSBtZS4uLicpXG5cbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IGluaXRpYWxpemVCb2FyZCBmcm9tIFwiLi9nYW1lY29udHJvbFwiXG5pbXBvcnQgcGxheUdhbWUgZnJvbSBcIi4vZ2FtZWNvbnRyb2xcIjtcblxuXG5wbGF5R2FtZSgpXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==