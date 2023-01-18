const handleMenu = (() => {
  const startButtonP = document.getElementById("fader");
  startButtonP.addEventListener("click", () => {
    document.getElementById("title").className = "animateTitle";
    startButtonP.className = "buttonVanish";
    startButtonAI.className = "buttonVanish";
    setTimeout(fadeInGame, 1000);
    return { playerOne, playerTwo };
  });
  const startButtonAI = document.getElementById("faderAI");
  startButtonAI.addEventListener("click", () => {
    document.getElementById("title").className = "animateTitle";
    startButtonAI.className = "buttonVanish";
    startButtonP.className = "buttonVanish";
    setTimeout(fadeInGame, 1000);
    playerTwo.status = "AI";
    return { playerOne, playerTwo };
  });
  const fadeInGame = (() => {
    const main = document.getElementById("main");
    main.style.visibility = "visible";
    main.style.opacity = "1";
    const selector = document.getElementById("menuContainer");
    selector.style.visibility = "visible";
    selector.style.opacity = "1";
    const playerImages = document.getElementsByClassName("playerImg");
    for (let i = 0; i < playerImages.length; i++) {
      playerImages[i].style.visibility = "visible";
      playerImages[i].style.opacity = "1";
    };
    game.startGame();
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
  const playerOnePic = document.getElementById("playerOnePic");
  const playerTwoPic = document.getElementById("playerTwoPic");
  const board = gameBoard.board;
  const renderBoard = () => {
    const playerGame = () => {
    board.forEach((item, index) => {
      const clicked = document.getElementById(`cell-${index}`);
      clicked.addEventListener("click", () => {
        if ((playerOne.currentlyActive == true && board[index] == "")) {
          clicked.textContent = "X";
          board[index] = "X";
          console.log(board);
          playerOne.currentlyActive = false;
          playerTwo.currentlyActive = true;
          playerTwoPic.style.removeProperty("box-shadow");
          playerOnePic.style.boxShadow = "none";
          playerOnePic.style.transform = "translateY(2vh)";
          playerTwoPic.style.transform = "translateY(-2vh)";
          document.getElementById("turnDisplay").innerText = "Player Two's Turn.";
          game.checkWinner();
        } else if (playerTwo.currentlyActive == true && board[index] == "") {
            clicked.textContent = "O";
            board[index] = "O"
            console.log(board);
            playerOne.currentlyActive = true;
            playerTwo.currentlyActive = false;
            playerOnePic.style.removeProperty("box-shadow");
            playerTwoPic.style.boxShadow = "none";
            playerTwoPic.style.transform = "translateY(2vh)";
            playerOnePic.style.transform = "translateY(-2vh)";
            document.getElementById("turnDisplay").innerText = "Player One's Turn.";
            game.checkWinner();
        };
      });
    });
  };
  const aiGame = () => {  
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
        };
        aiRandom = Math.floor(Math.random() * 9);
        if (board[aiRandom] !== "" && board.includes("") == true) {
          while (board[aiRandom] !== "") {
            aiRandom = Math.floor(Math.random() * 9);
          };
        };
        if (playerTwo.currentlyActive == true && board[aiRandom] == "") {
          const aiClick = document.getElementById(`cell-${aiRandom}`);
          aiClick.textContent = "O";
          board[aiRandom] = "O"
          console.log(board);
          playerOne.currentlyActive = true;
          playerTwo.currentlyActive = false;
          document.getElementById("turnDisplay").innerText = "Player One's Turn.";
          game.checkWinner();
        };
      });
    });
  };
  return { playerGame, aiGame };
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
    if (playerTwo.status === "human") {
      displayController.renderBoard().playerGame();
    } else if (playerTwo.status === "AI") {
      displayController.renderBoard().aiGame();
    };
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
    document.getElementById("turnDisplay").innerText = "Player One's Turn.";
    displayController.clearBoard();
  };
  return { startGame, checkWinner };
})();
const playerOne = playerFactory("player", "human");
const playerTwo = playerFactory("player", "human");
handleMenu();