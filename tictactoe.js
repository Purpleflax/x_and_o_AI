const playerFactory = (name, status) => {
  const currentlyActive = false;
  return { name, status, currentlyActive };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const displayController = (() => {
  const board = gameBoard.board;
  const renderBoard = () => {
    board.forEach((item, index) => {
      const clicked = document.getElementById(`cell-${index}`);
      clicked.addEventListener("click", () => {
        if ((playerOne.currentlyActive == true && board[index] == "")) {
          clicked.textContent = "X";
          board[index] = "X";
          console.log(board);
          playerOne.currentlyActive = false;
          playerTwo.currentlyActive = true;
          document.getElementById("turnDisplay").innerText = "Player Two's Turn.";
          game.checkWinner();
        } else if (playerTwo.currentlyActive == true && board[index] == "") {
            clicked.textContent = "O";
            board[index] = "O"
            console.log(board);
            playerOne.currentlyActive = true;
            playerTwo.currentlyActive = false;
            document.getElementById("turnDisplay").innerText = "Player One's Turn.";
            game.checkWinner();
        };
      });
    });
  };
  const clearBoard = (() => {
    board.forEach((item, index) => {
      const toClear = document.getElementById(`cell-${index}`);
      toClear.innerText = "";
    });
  });
  return { renderBoard, clearBoard };
})();

const game = (() => {
  const board = gameBoard.board;
  const startGame = () => {
    playerOne.currentlyActive = true;
    playerTwo.currentlyActive = false;
    document.getElementById("end").addEventListener("click", () => {
      resetGame();
    });
    displayController.renderBoard();
  };
  const checkWinner = () => {
    board.forEach ((item, index) => {
      // check for horizontal wins
      if ((index % 3) === 0 && board[index] !== "") {
        if (board[index] === board[index + 1] && board[index] === board[index + 2]) {
          playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
          setTimeout(resetGame, 3000);
        };
      };
      if ((index <= 2) && board[index] !== "") {
        if (board[index] === board[index + 3] && board[index] === board[index + 6]) {
          playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
          setTimeout(resetGame, 3000);
        };
      };
    });
    if ((board[0] === board[4] && board[0] === board[8]) && board[0] !== "") {
      playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
      setTimeout(resetGame, 3000);
    };
    if ((board[2] === board[4] && board[2] === board[6]) && board[2] !== "") {
      playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
      setTimeout(resetGame, 3000);
    };
  };
  const resetGame = () => {
    board.forEach((item, index) => {
      board[index] = "";
    });
    playerOne.currentlyActive = true;
    playerTwo.currentlyActive = false;
    document.getElementById("turnDisplay").innerText = "Player One's turn.";
    displayController.clearBoard();
  };
  return { startGame, checkWinner };
})();

const playerOne = playerFactory("player", "human");
const playerTwo = playerFactory("player", "human");

game.startGame();
