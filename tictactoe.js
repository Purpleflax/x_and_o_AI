const handleMenu = () => {
  let difficulty;
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
    setTimeout(aiDifficulty, 1000);
    playerTwo.status = "AI";
    return { playerOne, playerTwo };
  });
  const fadeInGame = () => {
    const main = document.getElementById("main");
    main.style.visibility = "visible";
    main.style.opacity = "1";
    game.startGame();
  };
  const aiDifficulty = () => {
    const selector = document.getElementById("menuContainer");
    selector.style.visibility = "visible";
    selector.style.opacity = "1";
    const easy = document.getElementById("easy");
    easy.addEventListener("click", () => {
      console.log("easy");
      difficulty = "easy";
      selector.style.visibility = "hidden";
      selector.style.opacity = "0";
      setTimeout(fadeInGame, 1000);
    });
    const medium = document.getElementById("medium");
    medium.addEventListener("click", () => {
      console.log("medium");
      difficulty = "medium";
      selector.style.visibility = "hidden";
      selector.style.opacity = "0";
      setTimeout(fadeInGame, 1000);
    });
    const hard = document.getElementById("hard");
    hard.addEventListener("click", () => {
      selector.style.visibility = "hidden";
      selector.style.opacity = "0";
      console.log("hard");
      difficulty = "hard";
      setTimeout(fadeInGame, 1000);
    });
  };
  return { difficulty };
};

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
      switchActiveImg();
      playerTwoPic.innerHTML = `<img src="./images/person.svg" alt="X" class="playerImg">`;
      board.forEach((item, index) => {
        const clicked = document.getElementById(`cell-${index}`);
        clicked.addEventListener("click", () => {
          if (playerOne.currentlyActive == true && board[index] == "") {
            clicked.textContent = "X";
            board[index] = "X";
            console.log(board);
            playerOne.currentlyActive = false;
            playerTwo.currentlyActive = true;
            switchActiveImg();
            document.getElementById("turnDisplay").innerText =
              "Player Two's Turn.";
            game.checkWinner();
          } else if (playerTwo.currentlyActive == true && board[index] == "") {
            clicked.textContent = "O";
            board[index] = "O";
            console.log(board);
            playerOne.currentlyActive = true;
            playerTwo.currentlyActive = false;
            switchActiveImg();
            document.getElementById("turnDisplay").innerText =
              "Player One's Turn.";
            game.checkWinner();
          }
        });
      });
    };
    const aiGame = () => {
      playerTwoPic.innerHTML = `<img src="./images/ai.svg" alt="X" class="playerImg">`;
      switchActiveImg();
      board.forEach((item, index) => {
        const clicked = document.getElementById(`cell-${index}`);
        clicked.addEventListener("click", () => {
          if (playerOne.currentlyActive == true && board[index] == "") {
            clicked.textContent = "X";
            board[index] = "X";
            console.log(board);
            playerOne.currentlyActive = false;
            playerTwo.currentlyActive = true;
            switchActiveImg();
            document.getElementById("turnDisplay").innerText =
              "Player Two's Turn.";
            game.checkWinner();
          }
          if (difficulty === "easy") {
            setTimeout(() => {
              aiRandom = Math.floor(Math.random() * 9);
              if (board[aiRandom] !== "" && board.includes("") == true) {
                while (board[aiRandom] !== "") {
                  aiRandom = Math.floor(Math.random() * 9);
                }
              }
              if (playerTwo.currentlyActive == true && board[aiRandom] == "") {
                const aiClick = document.getElementById(`cell-${aiRandom}`);
                aiClick.textContent = "O";
                board[aiRandom] = "O";
                console.log(board);
                playerOne.currentlyActive = true;
                playerTwo.currentlyActive = false;
                switchActiveImg();
                document.getElementById("turnDisplay").innerText =
                  "Player One's Turn.";
                game.checkWinner();
              }
            }, 1000);
          }
          if (difficulty === "medium") {
            setTimeout(() => {
              aiRandom = Math.floor(Math.random() * 9);
              if (board[aiRandom] !== "" && board.includes("") == true) {
                while (board[aiRandom] !== "") {
                  aiRandom = Math.floor(Math.random() * 9);
                }
              }
              if (playerTwo.currentlyActive == true && board[aiRandom] == "") {
                const aiClick = document.getElementById(`cell-${aiRandom}`);
                aiClick.textContent = "O";
                board[aiRandom] = "O";
                console.log(board);
                playerOne.currentlyActive = true;
                playerTwo.currentlyActive = false;
                switchActiveImg();
                document.getElementById("turnDisplay").innerText =
                  "Player One's Turn.";
                game.checkWinner();
              }
            }, 1000);
          }
          if (difficulty === "hard") {
            // minimax algorithm
            let intelliCheck = true;
            let bestScore = -Infinity;
            const toMaxArray = Array.from(board);
          }
        });
      });
    };
    return { playerGame, aiGame };
  };
  const clearBoard = () => {
    switchActiveImg();
    board.forEach((item, index) => {
      const toClear = document.getElementById(`cell-${index}`);
      toClear.innerText = "";
    });
  };

  const switchActiveImg = () => {
    if (playerOne.currentlyActive === true) {
      playerOnePic.style.removeProperty("box-shadow");
      playerTwoPic.style.boxShadow = "none";
      playerTwoPic.style.transform = "translateY(2vh)";
      playerOnePic.style.transform = "translateY(-2vh)";
    }
    if (playerTwo.currentlyActive === true) {
      playerTwoPic.style.removeProperty("box-shadow");
      playerOnePic.style.boxShadow = "none";
      playerOnePic.style.transform = "translateY(2vh)";
      playerTwoPic.style.transform = "translateY(-2vh)";
    }
  };

  const winScreen = () => {
    const toBlur = document.querySelector("#whole");
    toBlur.style.filter = "blur(5px)";
    const winSplash = document.getElementById("winSplash");
    winSplash.style.visibility = "visible";
    winSplash.style.opacity = "1";
  };
  return { renderBoard, clearBoard, switchActiveImg, winScreen };
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
    }
  };
  const aiMove = (isMaximizing) => {
    const depth = (maxDepth = -1) => {
      this.maxDepth = maxDepth;
      this.nodesMap = new Map();
    };
    const minimax = (board, depth, isMaximizing) => {
      if (depth === 0) this.nodesMap.clear();
      if (depth === this.maxDepth) {
        return checkWinner(true);
      }
  };
};
  const checkWinner = (intelliCheck) => {
    document.getElementById("playAgain").addEventListener("click", () => {
      resetGame();
    });
    const winner = document.getElementById("winText");
    movesMade++;
    board.forEach((item, index) => {
      // check for horizontal wins
      if (index % 3 === 0 && board[index] !== "") {
        if (
          board[index] === board[index + 1] &&
          board[index] === board[index + 2]
        ) {
          if (intelliCheck === true) {
            return board[index];
          } else {
            playerOne.currentlyActive
              ? (winner.innerText = "Player Two Wins!")
              : (winner.innerText = "Player One Wins!");
            displayController.winScreen();
            return;
          }
        }
      }
      if (index <= 2 && board[index] !== "") {
        if (
          board[index] === board[index + 3] &&
          board[index] === board[index + 6]
        ) {
          if (intelliCheck === true) {
            return board[index];
          } else {
            playerOne.currentlyActive
              ? (winner.innerText = "Player Two Wins!")
              : (winner.innerText = "Player One Wins!");
            displayController.winScreen();
            return;
          }
        }
      }
    });
    if (board[0] === board[4] && board[0] === board[8] && board[0] !== "") {
      playerOne.currentlyActive
        ? (winner.innerText = "Player Two Wins!")
        : (winner.innerText = "Player One Wins!");
      displayController.winScreen();
      return;
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2] !== "") {
      playerOne.currentlyActive
        ? (winner.innerText = "Player Two Wins!")
        : (winner.innerText = "Player One Wins!");
      displayController.winScreen();
      return;
    }
    if (movesMade === 9) {
      winner.innerText = "It's a tie!";
      displayController.winScreen();
      return;
    }
  };
  const resetGame = () => {
    board.forEach((item, index) => {
      board[index] = "";
    });
    document.getElementById("winSplash").style.visibility = "hidden";
    document.getElementById("winSplash").style.opacity = "0";
    document.querySelector("#whole").style.filter = "blur(0px)";
    playerOne.currentlyActive = true;
    playerTwo.currentlyActive = false;
    movesMade = 0;
    document.getElementById("turnDisplay").innerText = "Player One's Turn.";
    displayController.clearBoard();
    displayController.switchActiveImg();
  };
  return { startGame, checkWinner };
})();
const playerOne = playerFactory("player", "human");
const playerTwo = playerFactory("player", "human");
handleMenu();
