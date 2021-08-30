import gameboard from "../gameboard";
import ship from "../ship";

describe("Is the board and a ship there?", () => {
  let player = "me";
  let playerBoard = gameboard(player);
  let board = playerBoard.getBoard();
  test("Tests existence of board", () => {
    expect(board.length).toBe(100);
  });

  playerBoard.placeShip(3, 1);
  test("Tests existence of ship on board", () => {
    expect(board[3].ship).toBe(true);
  });

  playerBoard.placeShip(3, 1);
  test("confirms existence of ship on board", () => {
    expect(board[13].ship).toBe(false);
  });

  playerBoard.placeShip(34, 3);
  test("confirms placement of 4 square vertical ship", () => {
    expect(board[14].ship).toBe(true);
  });

  test("confirms placement of 4 square vertical ship partb", () => {
    expect(board[24].ship).toBe(true);
  });


  test("confirms id is present", () => {
    expect(board[14].id).toBe("ship34");
  });
});



describe("checking logging of hits on board and ships", () => {
  let samplePlayerShip = ship(33, 3);
  let samplePlayerBoard = gameboard("player");
  samplePlayerBoard.meta.ships.push(samplePlayerShip);

  test("confirms ship manifest logs information", () => {
    expect(samplePlayerBoard.meta.ships.length).toBe(1);
  });

  let newPlayerBoard = gameboard("me");
  let ship1 = ship(3, 40);
  newPlayerBoard.placeShip(40, 3);
  let ship2 = ship(2, 15);
  newPlayerBoard.placeShip(15, 2);

  newPlayerBoard.receiveAttack(5);

  test("confirms receive attack logs hit on appropriate ship", () => {
    expect(newPlayerBoard.meta.ships[1].hits.length).toBe(1);
  });
});

describe("does sinking work in meta.ships", () => {
    let newPlayerBoard = gameboard("me");
    let ship1 = ship(3, 40);
    newPlayerBoard.placeShip(40, 3);
    let ship2 = ship(2, 15);
    newPlayerBoard.placeShip(15, 2);
  
    newPlayerBoard.receiveAttack(5);
    newPlayerBoard.receiveAttack(15);

  test("confirms sinking of a ship", () => {
    expect(newPlayerBoard.meta.ships[1].isSunk()).toBe(true);
  });
});

