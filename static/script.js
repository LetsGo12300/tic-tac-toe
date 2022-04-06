// FACTORY for PLAYERS

const playerFactory = (name, symbol) => {
    // let turn = 'yes'; ???
    return { name, symbol };
};
  
const player1 = playerFactory('player1', 'X'); // X
const player2 = playerFactory('player2', 'O'); // O

// MODULE for GAME BOARD

const gameBoard = (() => {
    let boardArray = [[]];
    const checkWinner = () => {
        
    };
    return {
        boardArray,
        checkWinner
    };
})();

// MODULE for DISPLAY CONTROLLER

const displayController = (() => {
    const updateGrid = (row, column, symbol) => {
        let box = document.querySelector(`[data-row='${row}'][data-column='${column}']`);
        //Checks if the box is already taken by a symbol
        if (box.textContent === ''){
            box.textContent = symbol;
            return true;
        } else return false;
    };
    const resetGrid = () => {
        let allBoxes = document.querySelectorAll('.box');
        allBoxes.forEach((box) => {
            box.textContent = '';
        });
    };
    return {
      updateGrid,
      resetGrid
    };
})();

document.addEventListener('click', (ele) => {
    const clickedBox = ele.target;

    // if a box is clicked
    if (clickedBox.className === 'box'){
        console.log('box was clicked');    
    }
    
});

// how to reset board -> displayController.resetGrid();
//how to update -> displayController.updateGrid(1,2,player2.symbol);