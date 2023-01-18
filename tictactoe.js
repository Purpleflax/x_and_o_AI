const playerFactory = (name, status) => {
  const currentlyActive = false;
  return { name, status, currentlyActive };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  return { getBoard };
})();

const displayController = (() => {
  const renderBoard = () => {
    const board = gameBoard.getBoard();
    board.forEach((item, index) => {
      const clicked = document.getElementById(`cell-${index}`);
      clicked.addEventListener("click", () => {
        if ((playerOne.currentlyActive == true && board[index] != "O")) {
          clicked.textContent = "X";
          board[index] = "X";
          console.log(board);
          playerOne.currentlyActive = false;
          playerTwo.currentlyActive = true;
        } else if (playerTwo.currentlyActive == true && board[index] != "X") {
            clicked.textContent = "O";
            board[index] = "O"
            console.log(board);
            playerOne.currentlyActive = true;
            playerTwo.currentlyActive = false;
        };
      });
    });
  };
  return { renderBoard };
})();

const game = (() => {
  const startGame = () => {
    playerOne.currentlyActive = true;
    displayController.renderBoard();
  };
  return { startGame };
})();

const playerOne = playerFactory("player", "human");
const playerTwo = playerFactory("player", "human");

game.startGame();
