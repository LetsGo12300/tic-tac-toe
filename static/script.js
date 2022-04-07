// FACTORY for PLAYERS

const playerFactory = (name, symbol) => {
    return { name, symbol };
};

// MODULE for GAME BOARD

const gameBoard = (() => {
    let boardArray = ['','','','','','','','',''];
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const checkTie = () => {
        return boardArray.every(box => (box != ''));
    };
    const updateBoard = (boxIndex, symbol) => {
        boardArray[boxIndex] = symbol;
    };
    const resetBoard = () => {
        boardArray = boardArray = ['','','','','','','','',''];
    };
    const checkWinner = (currentPlayer) => {
        for (let i = 0; i < winningCombinations.length; i++){
            let testArray =  [];
            for (let j = 0; j < 3; j++){
                testArray.push(boardArray[winningCombinations[i][j]]);
            }
            if (testArray.every(box => (box === currentPlayer.symbol))){
                return true;
            }
        }
    };
    return {
        updateBoard,
        resetBoard,
        checkWinner,
        checkTie
    };
})();

// MODULE for DISPLAY CONTROLLER
const allBoxes = document.querySelectorAll('.box');
const greeting = document.getElementById('greet');

const displayController = (() => {
    const updateGrid = (boxIndex, symbol) => {
        let box = document.querySelector(`[data-index='${boxIndex}']`);
        box.textContent = symbol;
    };
    const disableGame = () => {
        allBoxes.forEach(box => {
            box.style.pointerEvents = 'none';
        });
    };
    const enableGame = () => {
        allBoxes.forEach(box => {
            box.style.pointerEvents = 'auto';
        });
    };
    const resetGrid = () => {
        // clear all boxes
        allBoxes.forEach(box => {
            box.textContent = '';
        });
        // return current player to player 1;
        currentPlayer = player1;
        greeting.textContent = `${currentPlayer.name}'s turn`;
        enableGame();
    };
    const updateGreeting = (currentPlayer, text) => {
        if (text === 'win'){
            greeting.textContent = `${currentPlayer.name} wins!`;
        } else if (text === 'tie'){
            greeting.textContent = 'It\'s a tie!';
        } else greeting.textContent = `${currentPlayer.name}'s turn`;
    };
    
    return {
      updateGrid,
      resetGrid,
      disableGame,
      updateGreeting,
    };
})();

// EVENT LISTENERS

document.addEventListener('click', (ele) => {
    const clickedElement = ele.target;

    // if a box is clicked
    if (clickedElement.className === 'box'){
        let clickedBoxIndex = clickedElement.getAttribute('data-index'); 
        if (clickedElement.textContent === ''){
            displayController.updateGrid(clickedBoxIndex, currentPlayer.symbol);
            gameBoard.updateBoard(clickedBoxIndex, currentPlayer.symbol);
            
            //Check if there is a winner
            if (gameBoard.checkWinner(currentPlayer)){
                // DISABLE GAME, announce winner
                displayController.disableGame();
                displayController.updateGreeting(currentPlayer, 'win');
            } else if (!gameBoard.checkWinner(currentPlayer) && gameBoard.checkTie()){
                // DISABLE GAME, announce tie
                displayController.disableGame();
                displayController.updateGreeting(currentPlayer, 'tie');
            } else {
                currentPlayer = (currentPlayer == player1 ? player2 : player1);
                displayController.updateGreeting(currentPlayer);
            }
            
        }
    }
    
    // if reset button is clicked
    if (clickedElement.className === 'reset-btn'){
        displayController.resetGrid();
        gameBoard.resetBoard();
    }
});


const player1 = playerFactory('Player 1', 'X'); // X
const player2 = playerFactory('Player 2', 'O'); // O

let currentPlayer = player1;
displayController.updateGreeting(currentPlayer);