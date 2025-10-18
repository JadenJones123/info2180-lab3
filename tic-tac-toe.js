
window.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const squares = board.getElementsByTagName("div");
  const status = document.getElementById("status");
  const newGameBtn = document.getElementsByClassName("btn")[0];
  
  let currentPlayer = "X";
  let gameState = Array(9).fill(null);
  let gameActive = true;

  //  Exercise 1: Style each square 
  for (let i = 0; i < squares.length; i++) {
    squares[i].classList.add("square");

    //  Exercise 2: Handle click events for X and O 
    squares[i].addEventListener("click", () => {
      if (!gameActive || gameState[i] !== null) return; // Disallow cheating (Exercise 6)
      squares[i].textContent = currentPlayer;
      squares[i].classList.add(currentPlayer);
      gameState[i] = currentPlayer;

      // Check if current player wins
      if (checkWinner()) {
        status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
        status.classList.add("you-won");
        gameActive = false;
      } else {
        // Alternate between X and O
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });

    //  Exercise 3: Hover effects 
    squares[i].addEventListener("mouseover", () => {
      if (gameActive && gameState[i] === null) {
        squares[i].classList.add("hover");
      }
    });

    squares[i].addEventListener("mouseout", () => {
      squares[i].classList.remove("hover");
    });
  }

  //  Exercise 5: Restart the game 
  newGameBtn.addEventListener("click", () => {
    gameState = Array(9).fill(null);
    gameActive = true;
    currentPlayer = "X";
    status.textContent = "Move your mouse over a square and click to play an X or an O.";
    status.classList.remove("you-won");
    
    for (let square of squares) {
      square.textContent = "";
      square.classList.remove("X", "O");
    }
  });

  //  Exercise 4: Check for winner 
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2], // rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6]
    ];

    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      );
    });
  }
});
