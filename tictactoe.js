let difficulty;
const handleMenu = () => {
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
};

const playerFactory = (name, status, marker) => {
  const currentlyActive = false;
  return { name, status, currentlyActive, marker };
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
          if (board[index] != "X" && board[index] == "" && playerOne.currentlyActive == true) {
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
    const aiGame = (difficulty) => {
      let gameOver;
      playerTwoPic.innerHTML = `<img src="./images/ai.svg" alt="X" class="playerImg">`;
      switchActiveImg();
      board.forEach((item, index) => {
        const clicked = document.getElementById(`cell-${index}`);
        clicked.addEventListener("click", () => {
          if (playerOne.currentlyActive == true && board[index] === "") {
            clicked.textContent = "X";
            board[index] = "X";
            console.log(board);
            playerOne.currentlyActive = false;
            playerTwo.currentlyActive = true;
            switchActiveImg();
            document.getElementById("turnDisplay").innerText =
              "Player Two's Turn.";
            gameOver = game.checkWinner();
          }
          console.log(gameOver)
          if (difficulty === "easy" && gameOver != true) {
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
          if (difficulty === "medium" && gameOver != true) {
            setTimeout(() => {
              if (playerTwo.currentlyActive == true) bestMove(board, 0, false);
            }, 1000);
          }
          if (difficulty === "hard" && gameOver != true) {
            if (playerTwo.currentlyActive == true) bestMove(board, 0, false);
          }
        });
      });
    };
    return { playerGame, aiGame, switchActiveImg };
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
      displayController.renderBoard().aiGame(difficulty);
    }
  };

  const checkWinner = () => {
    let gameOver = false;
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
          playerOne.currentlyActive
            ? (winner.innerText = "Player Two Wins!")
            : (winner.innerText = "Player One Wins!");
          displayController.winScreen();
          gameOver = true
          return gameOver;
        }

      }
      if (index <= 2 && board[index] !== "") {
        if (
          board[index] === board[index + 3] &&
          board[index] === board[index + 6]
        ) {
          playerOne.currentlyActive
            ? (winner.innerText = "Player Two Wins!")
            : (winner.innerText = "Player One Wins!");
          displayController.winScreen();
          gameOver = true
          return gameOver;
        }
      }
    });
    if (board[0] === board[4] && board[0] === board[8] && board[0] !== "") {
      playerOne.currentlyActive
        ? (winner.innerText = "Player Two Wins!")
        : (winner.innerText = "Player One Wins!");
      displayController.winScreen();
      gameOver = true
      return gameOver;
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2] !== "") {
      playerOne.currentlyActive
        ? (winner.innerText = "Player Two Wins!")
        : (winner.innerText = "Player One Wins!");
      displayController.winScreen();
      gameOver = true
      return gameOver;
    }
    if (movesMade === 9) {
      winner.innerText = "It's a tie!";
      displayController.winScreen();
      gameOver = true
      return gameOver;
    }
    return gameOver;
  };

  const aiCheckWinner = (board) => {
    let winner = null;
    board.forEach((item, index) => {
      // check for horizontal wins
      if (index % 3 == 0 && board[index] != "") {
        if (
          board[index] == board[index + 1] &&
          board[index] == board[index + 2]
        ) {
          if (board[index] == "X") {
            winner = "X";
          }
          else if (board[index] == "O") {
            winner = "O";

          }
        }

      }
      if (index <= 2 && board[index] !== "") {
        if (
          board[index] == board[index + 3] &&
          board[index] == board[index + 6]
        ) {
          if (board[index] == "X") {
            winner = "X";

          }
          else if (board[index] == "O") {
            winner = "O";

          }
        }

      }
    });
    if (board[0] == board[4] && board[0] == board[8] && board[0] != "") {
      if (board[0] == "X") {
        winner = "X";

      }
      else if (board[0] == "O") {
        winner = "O";

      }
    }
    else if (board[2] == board[4] && board[2] == board[6] && board[2] != "") {
      if (board[2] == "X") {
        winner = "X";

      }
      else if (board[2] == "O") {
        winner = "O";

      }
    }
    else if (board.includes("") === false && winner === null) {
      return "tie";
    }
    return winner;

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
  return { startGame, checkWinner, aiCheckWinner };
})();
const playerOne = playerFactory("player", "human", "X");
const playerTwo = playerFactory("player", "human", "O");
handleMenu();

function bestMove(board) {
  console.log("best move called")
  let bestScore = -Infinity;
  let moveToMake;
  let possibleMoves = getAvailableMoves(board);
  possibleMoves.forEach((move) => {
    board[move] = "O";
    let score = minimax(board, 0, false);
    board[move] = "";
    if (score > bestScore) {
      bestScore = score;
      moveToMake = move;
      console.log("best score: " + bestScore + " move to make: " + moveToMake)
    }
  });
  if (difficulty === "medium") {
    let mistakeChance = Math.random() * 10;
    if (mistakeChance < 3) {
      moveToMake = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    };
  }
  setTimeout(() => {
  const aiClick = document.getElementById(`cell-${moveToMake}`);
  aiClick.textContent = "O";
  board[moveToMake] = "O";
  console.log(board);
  playerOne.currentlyActive = true;
  playerTwo.currentlyActive = false;
  displayController.switchActiveImg();
  document.getElementById("turnDisplay").innerText = "Player One's Turn.";
  game.checkWinner();
  }, 1000);
}

function getAvailableMoves(board) {
  const availableMoves = [];
  board.forEach((item, index) => {
    if (item === "") {
      availableMoves.push(index);
    }
  });
  return availableMoves;
}

let scores = {
  X: -10,
  O: 10,
  tie: 0,
};

function minimax(board, depth, isMaximizing) {
  let result = game.aiCheckWinner(board);
  if (result !== null) {
    console.log("board: " + board + " depth: " + depth + " result: " + result)
    return scores[result];
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    let possibleMoves = getAvailableMoves(board);
    possibleMoves.forEach((move) => {
      board[move] = "O";
      let score = minimax(board, depth + 1, false);
      board[move] = "";
      bestScore = Math.max(score, bestScore);
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    let possibleMoves = getAvailableMoves(board);
    possibleMoves.forEach((move) => {
      board[move] = "X";
      let score = minimax(board, depth + 1, true);
      board[move] = "";
      bestScore = Math.min(score, bestScore);
    });
    return bestScore;
  }
};