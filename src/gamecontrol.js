import player from "./player";
import gameboard from "./gameboard";
import ship from "./ship";

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
  let currentPreviewLength = 5;

  const computerPlayer = player("computer");
  const humanPlayer = player("human");
  const playerGameboard = gameboard("player");
  const computerGameboard = gameboard("computer");

  const computerDomBoard = document.getElementById("computer-board");
  const playerDomBoard = document.getElementById("player-board");
  const placeDomBoard = document.getElementById("place-board");

  const rotateBtn = document.getElementById("rotate");
  rotateBtn.addEventListener("click", () => rotateMyShips());
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
          setPlayerBoard()
          closeModal();
        });
      }
      previewShip(3, shipDirection);
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


export default playGame;
