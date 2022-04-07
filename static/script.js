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
                console.log(`${currentPlayer.name} wins!`);
                return true;
            }
        }
    };
    return {
        updateBoard,
        resetBoard,
        checkWinner
    };
})();

// MODULE for DISPLAY CONTROLLER
const allBoxes = Array.from(document.querySelectorAll('.box'));

const displayController = (() => {
    const updateGrid = (boxIndex, symbol) => {
        let box = document.querySelector(`[data-index='${boxIndex}']`);
        box.textContent = symbol;
    };
    const resetGrid = () => {
        // clear all boxes
        allBoxes.forEach((box) => {
            box.textContent = '';
        });
        // return current player to player 1;
        currentPlayer = player1;
    };
    return {
      updateGrid,
      resetGrid
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
                // DISABLE GAME
            }
            currentPlayer = (currentPlayer == player1 ? player2 : player1);
        }
    }
    
    // if reset button is clicked
    if (clickedElement.className === 'reset-btn'){
        displayController.resetGrid();
        gameBoard.resetBoard();
    }
});


const player1 = playerFactory('player1', 'X'); // X
const player2 = playerFactory('player2', 'O'); // O

let currentPlayer = player1;