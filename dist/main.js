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

let shipDirection = "y";

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

  const rotateBtn = document.getElementById("rotate");
  rotateBtn.addEventListener("click", () => rotateMyShips());

  
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

		
		placeFrigate()
		function placeFrigate(){
			let placeSpots = document.querySelectorAll(".place")
			updatePlaceLog("frigate")
			//add event listener to add ship to player board, then display new board
			for(let i=0; i<placeSpots.length; i++){
				placeSpots[i].addEventListener("click", function(){
					playerGameboard.placeShip(i, 5, "y"),
					displayPlaceBoard()
					placeCruiser()
				})
				
			}
			previewShip(5,"frigate")
			}
			
		function placeCruiser(){
			let placeSpots = document.querySelectorAll(".place")
			updatePlaceLog("cruiser")
			//add event listener to add ship to player board, then display new board
			for(let i=0; i<placeSpots.length; i++){
				placeSpots[i].addEventListener("click", function(){
					playerGameboard.placeShip(i, 3, "y"),
					displayPlaceBoard()
					placeSub()
					})
				}
				previewShip(3,"cruiser")
				}

		function placeSub(){
			let placeSpots = document.querySelectorAll(".place")
			updatePlaceLog("Submarine")
			//add event listener to add ship to player board, then display new board
			for(let i=0; i<placeSpots.length; i++){
				placeSpots[i].addEventListener("click", function(){
					playerGameboard.placeShip(i, 3, "y"),
					displayPlaceBoard()
				})
			}
			previewShip(3,"Submarine")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7QUMvQ3JCO0FBQ0Esb0JBQW9CLEtBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7Ozs7QUFJQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUN0QnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFFQSxDQUEwQjtBQUNJO0FBQ007QUFDTztBQUNOOzs7QUFHckMscURBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVjb250cm9sLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgZ2FtZWJvYXJkID0gKHBsYXllcikgPT4ge1xuICAvL2luZm9ybWF0aW9uIGFib3V0IHRoZSBnYW1lYm9hcmRcbiAgY29uc3QgbWV0YSA9IHtcbiAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIsXG4gICAgc2hpcHM6IFtdLFxuICAgIG1pc3NlZEhpdHM6IFtdLFxuICB9O1xuICAvL2NyZWF0aW9uIG9mIHRoZSBnYW1lYm9hcmQgdGhyb3VnaCBsb29waW5nOyAxMHgxMDsgdXNlIGJvYXJkW3hdW3ldIHRvIHJlZmVyZW5jZSBhIHNwYWNlXG4gIGxldCBib2FyZCA9IFtdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTAwOyB4KyspIHtcbiAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgc2hpcDogZmFsc2UsXG4gICAgICAgIGlkOiBudWxsLFxuICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICBtaXNzZWRIaXQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgLy9Cb2FyZCBnaXZldGhcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcblxuICAvL1xuICBmdW5jdGlvbiBwbGFjZVNoaXAoc3BvdCwgbGVuZ3RoLCBkaXJlY3Rpb24pIHtcbiAgICBcbiAgICBcbiAgICBcbiAgICBsZXQgaWQgPSBgc2hpcCR7c3BvdH1gO1xuICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgIGJvYXJkW3Nwb3RdLmlkID0gaWQ7XG5cbiAgICBtZXRhLnNoaXBzLnB1c2goc2hpcChsZW5ndGgsc3BvdCkpO1xuXG4gICAgLy9mb3IgdmVydGljYWwgc2hpcHNcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIil7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBzcG90IC09IDEwO1xuICAgICAgICBib2FyZFtzcG90XS5zaGlwID0gdHJ1ZTtcbiAgICAgICAgYm9hcmRbc3BvdF0uaWQgPSBpZDtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvL0hvcml6b250YWwgc2hpcHNcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIil7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBzcG90ICs9IDE7XG4gICAgICAgIGJvYXJkW3Nwb3RdLnNoaXAgPSB0cnVlO1xuICAgICAgICBib2FyZFtzcG90XS5pZCA9IGlkO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgXG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHNwb3QpIHtcbiAgICBpZiAoYm9hcmRbc3BvdF0uaWQgIT0gbnVsbCkge1xuICAgICAgLy91cGRhdGUgdGhlIGJvYXJkXG4gICAgICBib2FyZFtzcG90XS5oaXQgPSB0cnVlO1xuXG4gICAgICAvL2ZpbmQgdGhlIGlkIG9mIHRoZSBib2F0IGF0IHRoYXQgbG9jYXRpb24gaW4gdGhlIG1ldGEuc2hpcHMgYXJyYXlcbiAgICAgIGxldCBpbmRleCA9IG1ldGEuc2hpcHMubWFwKChlKSA9PiBlLmlkKS5pbmRleE9mKGJvYXJkW3Nwb3RdLmlkKTtcblxuICAgICAgLy9oaXQgdGhhdCBib2F0IGF0IHRoZSBsb2NhdGlvblxuICAgICAgbWV0YS5zaGlwc1tpbmRleF0uaGl0KHNwb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXRhLm1pc3NlZEhpdHMucHVzaChzcG90KTtcbiAgICAgIGJvYXJkW3Nwb3RdLm1pc3NlZEhpdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRCb2FyZCxcbiAgICBtZXRhLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICB9O1xufTtcblxuXG5cblxuXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZDtcbiIsImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG4vKiBTdGVwczpcbiAgICAxLiBJbml0aWFsaXplIGdhbWVib2FyZCB4XG4gICAgMi4gQ29tcHV0ZXIgcGlja3MgcmFuZG9tIHNoaXBzXG4gICAgMy4gUGxheWVyIHBsYWNlcyB0aGVpciBzaGlwczpcbiAgICAgICAgMS5cbiAgICA0LiBUdXJucyBiZWdpbi4gRWFjaCB0dXJuIGNvbnNpdHMgb2Y6XG4gICAgICAgIDEuIGNob29zaW5nIHNwb3QgcnVubmlnbiBjb21wdXRlckJvYXJkLnJlY2VpdmUoc3BvdClcbiAgICAgICAgMi4gU3dpdGNoIHR1cm5cblxuXG5UbyBkbzogXG4gICAgMS4gTWFrZSBhYmlsaXR5IHRvIHBsYWNlIHNoaXBzIGhvcml6b250YWxseVxuICAgIDIuIGNyZWF0ZSByYW5kb20gcGxhY2VtZW50IGZvciBjb21wdXRlclxuICAgIDIuIFxuKi9cblxubGV0IHNoaXBEaXJlY3Rpb24gPSBcInlcIjtcblxuZnVuY3Rpb24gcm90YXRlTXlTaGlwcygpIHtcbiAgaWYgKHNoaXBEaXJlY3Rpb24gPT0gXCJ5XCIpIHtcbiAgICBsZXQgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpc3BsYXktdmVydGljYWxcIik7XG4gICAgY29uc29sZS5sb2coc2hpcHMpO1xuICAgIGxldCByb3RhdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0YWJsZVwiKTtcbiAgICByb3RhdGFibGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJyb3RhdGFibGUtY29sdW1uXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXBzW2ldLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGlzcGxheS1ob3Jpem9udGFsXCIpO1xuICAgIH1cblxuICAgIHJldHVybiAoc2hpcERpcmVjdGlvbiA9IFwieFwiKTtcbiAgfSBlbHNlIGlmIChzaGlwRGlyZWN0aW9uID09IFwieFwiKSB7XG4gICAgbGV0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXNwbGF5LWhvcml6b250YWxcIik7XG4gICAgbGV0IHJvdGF0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm90YXRhYmxlXCIpO1xuICAgIHJvdGF0YWJsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJvdGF0YWJsZS1yb3dcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgc2hpcHNbaV0uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwLWRpc3BsYXkgZGlzcGxheS12ZXJ0aWNhbFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHNoaXBEaXJlY3Rpb24gPSBcInlcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxheUdhbWUoKSB7XG4gIGNvbnN0IGNvbXB1dGVyUGxheWVyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIGNvbnN0IGh1bWFuUGxheWVyID0gcGxheWVyKFwiaHVtYW5cIik7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IGdhbWVib2FyZChcInBsYXllclwiKTtcbiAgY29uc3QgY29tcHV0ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmQoXCJjb21wdXRlclwiKTtcblxuICBjb25zdCBjb21wdXRlckRvbUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlci1ib2FyZFwiKTtcbiAgY29uc3QgcGxheWVyRG9tQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllci1ib2FyZFwiKTtcbiAgY29uc3QgcGxhY2VEb21Cb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxhY2UtYm9hcmRcIilcblxuICBjb25zdCByb3RhdGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdGF0ZVwiKTtcbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiByb3RhdGVNeVNoaXBzKCkpO1xuXG4gIFxuICAvL3R3byB0ZXN0IHNoaXBzXG4gIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDIsIFwieFwiKTtcbiAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg3NSwgMiwgXCJ5XCIpO1xuICBjb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoNTAsIDQsIFwieFwiKTtcbiAgaW5pdGlhbGl6ZUJvYXJkKCk7XG5cblxuXG5cblxuICBmdW5jdGlvbiBzd2l0Y2hUdXJuKCkge1xuICAgIGlmICh0dXJuID09IFwicGxheWVyXCIpIHtcbiAgICAgIHJldHVybiAodHVybiA9IFwiY29tcHV0ZXJcIik7XG4gICAgfVxuICB9XG5cbiAgbGV0IHR1cm4gPSBcInBsYXllclwiO1xuICBmdW5jdGlvbiBwbGF5ZXJUdXJuKGUsIG9wcG9zaXRpb25Cb2FyZCkge1xuICAgIG9wcG9zaXRpb25Cb2FyZC5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmlkKSk7XG4gICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChlKTtcbiAgICBzd2l0Y2hUdXJuKCk7XG4gICAgY29tcHV0ZXJUdXJuKCk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVyVHVybigpIHtcbiAgICBsZXQgc2VsZWN0aW9uID0gY29tcHV0ZXJQbGF5ZXIucmFuZG9tTW92ZSgpO1xuICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHNlbGVjdGlvbik7XG4gICAgdXBkYXRlUGxheWVyQm9hcmQoc2VsZWN0aW9uKTtcbiAgfVxuXG5cblxuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemVCb2FyZCgpIHtcbiAgICAvL0NyZWF0ZSBjb21wdXRlciBib2FyZFxuICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2JvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGkpO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKTtcblxuICAgICAgc3BvdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHBsYXllclR1cm4oZSwgY29tcHV0ZXJHYW1lYm9hcmQpKTtcblxuICAgICAgY29tcHV0ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImlkXCIsIGBwJHtpfWApO1xuICAgICAgc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInNwb3QgcFwiKTtcbiAgICAgIGlmIChwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHBcIik7XG4gICAgICB9XG4gICAgICBpZiAocGJvYXJkW2ldLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXQgXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBib2FyZFtpXS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWlzcyBcIik7XG4gICAgICB9XG5cbiAgICAgIHBsYXllckRvbUJvYXJkLmFwcGVuZENoaWxkKHNwb3QpO1xuXG4gICAgfVxuXHRzZWxlY3RTaGlwc1dhbGtUaHJvdWdoKFwiZnJpZ2F0ZVwiLCA1KVxuXG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlQbGFjZUJvYXJkKCl7XG5cdHJlbW92ZUNoaWxkTm9kZXMocGxhY2VEb21Cb2FyZClcblx0bGV0IHBsYWNlQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlQm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgYHAke2l9YCk7XG4gICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3BvdCBwIHBsYWNlXCIpO1xuICAgICAgaWYgKHBsYWNlQm9hcmRbaV0uc2hpcCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwIHAgcGxhY2VcIik7XG4gICAgICB9XG4gICAgICBpZiAocGxhY2VCb2FyZFtpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0IFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGFjZUJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzIFwiKTtcbiAgICAgIH1cblxuICAgICAgcGxhY2VEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KTtcbiAgICB9XG4gIH1cblxuXG5cblx0ZnVuY3Rpb24gc2VsZWN0U2hpcHNXYWxrVGhyb3VnaCgpe1xuXHRcdGRpc3BsYXlQbGFjZUJvYXJkKClcblxuXHRcdFxuXHRcdHBsYWNlRnJpZ2F0ZSgpXG5cdFx0ZnVuY3Rpb24gcGxhY2VGcmlnYXRlKCl7XG5cdFx0XHRsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIilcblx0XHRcdHVwZGF0ZVBsYWNlTG9nKFwiZnJpZ2F0ZVwiKVxuXHRcdFx0Ly9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDUsIFwieVwiKSxcblx0XHRcdFx0XHRkaXNwbGF5UGxhY2VCb2FyZCgpXG5cdFx0XHRcdFx0cGxhY2VDcnVpc2VyKClcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XHRwcmV2aWV3U2hpcCg1LFwiZnJpZ2F0ZVwiKVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0ZnVuY3Rpb24gcGxhY2VDcnVpc2VyKCl7XG5cdFx0XHRsZXQgcGxhY2VTcG90cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VcIilcblx0XHRcdHVwZGF0ZVBsYWNlTG9nKFwiY3J1aXNlclwiKVxuXHRcdFx0Ly9hZGQgZXZlbnQgbGlzdGVuZXIgdG8gYWRkIHNoaXAgdG8gcGxheWVyIGJvYXJkLCB0aGVuIGRpc3BsYXkgbmV3IGJvYXJkXG5cdFx0XHRmb3IobGV0IGk9MDsgaTxwbGFjZVNwb3RzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cGxhY2VTcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKGksIDMsIFwieVwiKSxcblx0XHRcdFx0XHRkaXNwbGF5UGxhY2VCb2FyZCgpXG5cdFx0XHRcdFx0cGxhY2VTdWIoKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cHJldmlld1NoaXAoMyxcImNydWlzZXJcIilcblx0XHRcdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcGxhY2VTdWIoKXtcblx0XHRcdGxldCBwbGFjZVNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKVxuXHRcdFx0dXBkYXRlUGxhY2VMb2coXCJTdWJtYXJpbmVcIilcblx0XHRcdC8vYWRkIGV2ZW50IGxpc3RlbmVyIHRvIGFkZCBzaGlwIHRvIHBsYXllciBib2FyZCwgdGhlbiBkaXNwbGF5IG5ldyBib2FyZFxuXHRcdFx0Zm9yKGxldCBpPTA7IGk8cGxhY2VTcG90cy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHBsYWNlU3BvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0cGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChpLCAzLCBcInlcIiksXG5cdFx0XHRcdFx0ZGlzcGxheVBsYWNlQm9hcmQoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0cHJldmlld1NoaXAoMyxcIlN1Ym1hcmluZVwiKVxuXHRcdFx0fVxuXHR9XG5cbn1cblxuZnVuY3Rpb24gdXBkYXRlUGxhY2VMb2coc2hpcCl7XG5cdGxldCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYWNlLWxvZ1wiKTtcblx0bG9nLmlubmVySFRNTD0gYDxoMz4gUGxhY2UgYSAke3NoaXB9PC9oMz5gXG59XG5cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkTm9kZXMocGFyZW50KSB7XG4gICAgd2hpbGUgKHBhcmVudC5jaGlsZHJlblswXSkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmNoaWxkcmVuWzBdKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVDb21wdXRlckJvYXJkKGUpIHtcbiAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5pZDtcblxuICAgIGxldCBjYm9hcmQgPSBjb21wdXRlckdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGxldCBjc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGluZGV4KTtcbiAgICBpZiAoY2JvYXJkW2luZGV4XS5zaGlwID09IHRydWUpIHtcbiAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcFwiKTtcbiAgICB9XG4gICAgaWYgKGNib2FyZFtpbmRleF0uaGl0ID09IHRydWUpIHtcbiAgICAgIGNzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgIH1cbiAgICBpZiAoY2JvYXJkW2luZGV4XS5taXNzZWRIaXQgPT0gdHJ1ZSkge1xuICAgICAgY3Nwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJtaXNzXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKHNlbGVjdGlvbikge1xuICAgIGxldCBpbmRleCA9IHNlbGVjdGlvbjtcblxuICAgIGxldCBwYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcblxuICAgIGxldCBwc3BvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwJHtpbmRleH1gKTtcbiAgICBpZiAocGJvYXJkW2luZGV4XS5zaGlwID09IHRydWUpIHtcbiAgICAgIHBzcG90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic2hpcCBwXCIpO1xuICAgIH1cbiAgICBpZiAocGJvYXJkW2luZGV4XS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgcHNwb3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaXRcIik7XG4gICAgfVxuICAgIGlmIChwYm9hcmRbaW5kZXhdLm1pc3NlZEhpdCA9PSB0cnVlKSB7XG4gICAgICBwc3BvdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1pc3NcIik7XG4gICAgfVxufVxuXG4gIFxuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gb3Blbk1vZGFsKCl7XG5cbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0nYmxvY2snO1xuXG4gICAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IGFib3V0KSB7XG4gICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgICB9XG59XG5cblxuZnVuY3Rpb24gY2xvc2VNb2RhbCgpe1xuICAgIGxldCBhYm91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhYm91dE1vZGFsJyk7XG4gICAgICAgIGFib3V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuXG5cblxuZnVuY3Rpb24gcHJldmlld1NoaXAobGVuZ3RoLCBkaXJlY3Rpb24pIHtcblxuICBsZXQgcHNwb3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGFjZVwiKTtcblxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHNwb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGRwID0gZnVuY3Rpb24oKXtkaXNwbGF5UHJldmlldyhpLCBkaXJlY3Rpb24sbGVuZ3RoKX1cbiAgICBsZXQgcnAgPSBmdW5jdGlvbigpe3JlbW92ZVByZXZpZXcoaSwgZGlyZWN0aW9uLCBsZW5ndGgpfVxuICAgIHBzcG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGRwIFxuICAgICk7XG4gICAgcHNwb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBycFxuICAgICk7XG4gIH1cbiAgZnVuY3Rpb24gZGlzcGxheVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdob3ZlcicpXG4gICAgICBmb3IobGV0IGogPTA7IGogPCBsZW5ndGggLSAxOyBqICsrKXtcbiAgICAgICAgICBwc3BvdHNbaW5kZXgral0uY2xhc3NMaXN0LmFkZCgnaG92ZXInKVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgICBwc3BvdHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJylcbiAgICAgICAgZm9yKGxldCBqID0wOyBqIDwgbGVuZ3RoIC0xOyBqICsrKXtcbiAgICAgICAgICAgIHBzcG90c1tpbmRleC09MTBdLmNsYXNzTGlzdC5hZGQoJ2hvdmVyJylcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVByZXZpZXcoaW5kZXgsIGRpcmVjdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSBcInhcIikge1xuICAgICAgcHNwb3RzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpXG4gICAgICBmb3IobGV0IGogPTA7IGogPCBsZW5ndGg7IGogKyspe1xuICAgICAgICAgIHBzcG90c1tpbmRleCtqXS5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcicpXG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgIHBzcG90c1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKVxuICAgICAgICBmb3IobGV0IGogPTA7IGogPCBsZW5ndGg7IGogKyspe1xuICAgICAgICAgICAgcHNwb3RzW2luZGV4LT0xMF0uY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKVxuICAgICAgICB9XG4gICAgfVxuICB9XG5cbn1cblxuLypcblxuLy90d28gdGVzdCBzaGlwc1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg1MCwgNCwgJ3gnKVxucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcCg3NSwgMiwgJ3knKVxuY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKDUwLCA0LCAneCcpXG5cblxuLy90ZXN0aW5nIGhpdCBhbmQgbWlzc1xucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soNDApXG5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjaygyMylcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUJvYXJkKCl7XG4gICAgLy9DcmVhdGUgY29tcHV0ZXIgYm9hcmRcbiAgICBsZXQgY2JvYXJkID0gY29tcHV0ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIGZvciAobGV0IGk9MCA7IGkgPCBjYm9hcmQubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgc3BvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnaWQnLCBpKVxuICAgICAgICBzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNwb3QgY29tcHV0ZXItc3BvdFwiKVxuXG4gICAgICAgIHNwb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT4gcGxheWVyVHVybihlLCBjb21wdXRlckdhbWVib2FyZCkpO1xuXG4gICAgICAgIGNvbXB1dGVyRG9tQm9hcmQuYXBwZW5kQ2hpbGQoc3BvdClcbiAgICB9XG4gICAgLy9jcmVhdGUgcGxheWVyIGJvYXJkXG4gICAgbGV0IHBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgZm9yIChsZXQgaT0wIDsgaSA8IHBib2FyZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBzcG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdpZCcsIGkpXG4gICAgICAgIHNwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwic3BvdFwiKVxuICAgICAgICBpZihwYm9hcmRbaV0uc2hpcCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcInNoaXAgXCIpfVxuICAgICAgICBpZihwYm9hcmRbaV0uaGl0ID09IHRydWUpe3Nwb3Quc2V0QXR0cmlidXRlKCdjbGFzcycsIFwiaGl0IFwiKX1cbiAgICAgICAgaWYocGJvYXJkW2ldLm1pc3NlZEhpdCA9PSB0cnVlKXtzcG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBcIm1pc3MgXCIpfVxuICAgICAgIFxuICAgICAgICBwbGF5ZXJEb21Cb2FyZC5hcHBlbmRDaGlsZChzcG90KVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwYm9hcmQpXG59XG4qL1xuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJcbmNvbnN0IHBsYXllciA9IChuYW1lKSA9PiB7XG4gICAgbGV0IG1ldGEgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIG1vdmVzOiBbXSxcbiAgICB9XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICBmdW5jdGlvbiB0dXJuKHNwb3Qpe1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhbmRvbU1vdmUoKXtcbiAgICAgICAgbGV0IHggPSAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcblxuICAgICAgICBmb3IgKGxldCBpPTAgOyBpIDwgbWV0YS5tb3Zlcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICBpZih4ID09PSBtZXRhLm1vdmVzW2ldKXtcbiAgICAgICAgICAgICAgICB4ID0gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICBcblxuICAgICAgICBtZXRhLm1vdmVzLnB1c2goeClcbiAgICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLypcbiAgICBjb25zdCBBSSA9ICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gcmFuZG9tTW92ZSgpe1xuXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHJldHVybiB7XG4gICAgICAgIG1ldGEsXG4gICAgICAgIHJhbmRvbU1vdmUsXG4gICAgfVxufVxuXG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IHNoaXAgPSAobGVuZ3RoLCBzcG90KSA9PiB7XG4gICAgbGV0IGlkID0gYHNoaXAke3Nwb3R9YFxuICAgIGxldCBoaXRzID0gW107XG4gICAgY29uc3QgaGl0ID0gKGhpdExvY2F0aW9uKSA9PiB7XG4gICAgICAgIGhpdHMucHVzaCh7XG4gICAgICAgICAgICBoaXRMb2NhdGlvblxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChoaXRzLmxlbmd0aCA9PSBsZW5ndGgpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtoaXQsIGhpdHMsIGxlbmd0aCwgaXNTdW5rLCBpZH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IHNoaXA7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnNvbGUubG9nKCdJZiB5b3Ugc2VlIG1lLi4uJylcblxuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgaW5pdGlhbGl6ZUJvYXJkIGZyb20gXCIuL2dhbWVjb250cm9sXCJcbmltcG9ydCBwbGF5R2FtZSBmcm9tIFwiLi9nYW1lY29udHJvbFwiO1xuXG5cbnBsYXlHYW1lKClcblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9