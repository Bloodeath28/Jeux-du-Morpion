// Variables globales
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let xScore = 0;
let oScore = 0;

// Éléments DOM
const squares = document.querySelectorAll('.square');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const resetGameButton = document.getElementById('reset-game');
const xScoreDiv = document.getElementById('x-score');
const oScoreDiv = document.getElementById('o-score');
const imgSquare = document.getElementsByClassName('imgSquare');

// Fonction pour changer de joueur
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.textContent = `Joueur ${currentPlayer} joue`;
}

// Fonction pour mettre à jour l'affichage des scores
function updateScores() {
  xScoreDiv.textContent = xScore;
  oScoreDiv.textContent = oScore;
}

// Fonction pour vérifier si un joueur a gagné
function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const element of winCombinations) {
    const [a, b, c] = element;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  if (!board.includes('')) {
    return 'tie';
  }

  return null;
}

// Fonction pour gérer le clic sur une case
function handleSquareClick(event) {
    const square = event.target;
    const squareIndex = parseInt(square.getAttribute('data-square'));
  
    if (board[squareIndex] || !gameActive) {
      return;
    }
  
    // Mettre à jour le tableau de jeu
    board[squareIndex] = currentPlayer;
  
    // Mettre à jour l'affichage de la case avec une image
    if (currentPlayer === 'X') {
      square.style.backgroundImage = 'url("https://www.hebergeur-image.com/upload/31.32.137.109-640af62f0ca39.png")';
      square.style.backgroundSize = 'cover';
    } else {
      square.style.backgroundImage = 'url("https://www.hebergeur-image.com/upload/31.32.137.109-640af701f168e.png")';
      square.style.backgroundSize = 'cover';
    }
  
    // Vérifier s'il y a un gagnant ou un match nul
    const winner = checkWin();
  
    if (winner) {
      gameActive = false;
      if (winner === 'tie') {
        statusDiv.textContent = 'Match nul';
      } else {
        statusDiv.textContent = `Le joueur ${winner} a gagné!`;
        if (winner === 'X') {
          xScore++;
        } else {
          oScore++;
        }
        updateScores();
      }
    } else {
      changePlayer();
    }
  }

// Fonction pour recommencer le jeu
function handleResetButtonClick() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  squares.forEach(square => {
    square.style.backgroundImage = '';
    square.classList.remove('player-X', 'player-O');
  });

  statusDiv.textContent = 'Joueur X commence';
}

// Ajouter les gestionnaires d'événements aux éléments DOM
squares.forEach(square => {
  square.addEventListener('click', handleSquareClick);
});

resetButton.addEventListener('click', handleResetButtonClick);
function handleResetGameButtonClick() {
  handleResetButtonClick();
  xScore = 0;
  oScore = 0;
  updateScores()
}
resetGameButton.addEventListener('click', handleResetGameButtonClick);