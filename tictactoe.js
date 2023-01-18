const playerFactory = (name, status) => {
    const placeMarker = () => {
        console.log('placeMarker');
    };
    return { name, status };
};

const gameBoard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board;
    return { getBoard };
})();

const displayController = (() => {
    const renderBoard = () => {
        const board = gameBoard.getBoard();
        board.forEach((item, index) => {
            const clicked = document.getElementById(`cell-${index}`);
            clicked.addEventListener('click', () => {
                clicked.textContent = 'X';
                board[index] = 'X';
                console.log(board);
            }
            );
        });
    };
    return { renderBoard };
})();

const game = (() => {
    const startGame = () => {
        displayController.renderBoard();
    };
    return { startGame };
})();

game.startGame();