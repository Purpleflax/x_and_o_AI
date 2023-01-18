const handleMenu = (() => {
  const startButton = document.getElementById("fader");
  startButton.addEventListener("click", () => {
    document.getElementById("title").className = "animateTitle";
    startButton.className = "buttonVanish";
    setTimeout(fadeInGame, 1000);
  });
  const fadeInGame = (() => {
    const main = document.getElementById("main");
    main.style.visibility = "visible";
    main.style.opacity = "1";
  });
});

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
  let movesMade = 0;
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
    movesMade++;
    board.forEach ((item, index) => {
      // check for horizontal wins
      if ((index % 3) === 0 && board[index] !== "") {
        if (board[index] === board[index + 1] && board[index] === board[index + 2]) {
          playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
          setTimeout(resetGame, 3000);
          return;
        };
      }
      else if ((index <= 2) && board[index] !== "") {
        if (board[index] === board[index + 3] && board[index] === board[index + 6]) {
          playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
          setTimeout(resetGame, 3000);
          return;
        };
      };
    });
    if ((board[0] === board[4] && board[0] === board[8]) && board[0] !== "") {
      playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
      setTimeout(resetGame, 3000);
      return;
    }
    else if ((board[2] === board[4] && board[2] === board[6]) && board[2] !== "") {
      playerOne.currentlyActive ? alert("Player Two wins!") : alert("Player One wins!");
      setTimeout(resetGame, 3000);
      return;
    }
    else if (movesMade === 9) alert("It's a tie!");
  };
  const resetGame = () => {
    board.forEach((item, index) => {
      board[index] = "";
    });
    playerOne.currentlyActive = true;
    playerTwo.currentlyActive = false;
    movesMade = 0;
    document.getElementById("turnDisplay").innerText = "Player One's turn.";
    displayController.clearBoard();
  };
  return { startGame, checkWinner };
})();

const playerOne = playerFactory("player", "human");
const playerTwo = playerFactory("player", "human");
handleMenu();
game.startGame();
