const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to create the game board
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
        updateStatus();
    }
}

// Function to toggle players (X or O)
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to update the game status
function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
            highlightWinnerCells(pattern);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        status.textContent = 'It\'s a draw!';
    }
}

// Function to highlight the winning cells
function highlightWinnerCells(cells) {
    for (const index of cells) {
        const cell = board.children[index];
        cell.style.backgroundColor = '#4caf50';
        cell.style.color = '#fff';
    }
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Player X\'s turn';

    // Reset board cells
    for (const cell of board.children) {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
        cell.style.color = '#000';
    }
}

// Initialize the game
createBoard();
updateStatus();
