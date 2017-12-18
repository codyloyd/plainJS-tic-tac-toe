const playerFactory = (name, symbol) => {
  const makeMove = (move, array) => {
    if (array[move] !== "") return false;
    array[move] = symbol;
    return array;
  };
  return {
    name,
    symbol,
    makeMove
  };
};

const gameFactory = (name1, name2) => {
  let gameArray = ["", "", "", "", "", "", "", "", ""];
  let player1 = playerFactory(name1, "x");
  let player2 = playerFactory(name2, "o");

  const gameboard = document.querySelector(".gameboard");

  const gridSquares = gameboard.querySelectorAll(".grid");

  function drawBoard(gameArray) {
    gridSquares.forEach((x, i) => (x.innerHTML = gameArray[i]));
  }
  function renderGameOver(winner) {
    const gameOverModal = document.createElement("div");
    gameOverModal.id = "game-over-modal";
    if (winner.name) {
      gameOverModal.textContent = `game over ${winner.name} won`;
    } else {
      gameOverModal.textContent = `it was a tie`;
    }
    document.body.appendChild(gameOverModal);
  }

  function checkGameOver(gameArray) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    if (!gameArray.includes("")) return { win: true, winner: "tie" };
    return winConditions.reduce(
      (win, c) => {
        if (gameArray[c[0]] == "") return win;
        if (
          gameArray[c[0]] === gameArray[c[1]] &&
          gameArray[c[0]] === gameArray[c[2]]
        ) {
          return { win: true, winner: gameArray[c[0]] };
        }
        return win;
      },
      { win: false, winner: null }
    );
  }

  function play() {
    let currentPlayer = player1;

    gridSquares.forEach((s, i) => {
      s.addEventListener("click", () => {
        if (currentPlayer.makeMove(i, gameArray)) {
          currentPlayer = currentPlayer == player1 ? player2 : player1;
          drawBoard(gameArray);
          gameOver = checkGameOver(gameArray);
          if (gameOver.win) {
            const winnerMarker = gameOver.winner;
            let winner = "tie";
            if (winnerMarker == "x") {
              winner = player1;
            } else if (winnerMarker == "o") {
              winner = player2;
            }
            renderGameOver(winner);
          }
        }
      });
    });
  }
  return {
    play
  };
};

let game = gameFactory("chris", "steve");
game.play();
