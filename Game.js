document.addEventListener('DOMContentLoaded', function() 
{
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    function handleMove(cellIndex) {
        if (board[cellIndex] === '' && !checkWinner()) {
            board[cellIndex] = currentPlayer;
            render();
            if(checkWinner()) {
                document.getElementById('status').textContent = `${currentPlayer} wins!`;
            } 
            else if(!checkDraw()) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            } 
            else {
                document.getElementById('status').textContent = 'It\'s a draw!';
            }
        }
    }

    function checkWinner() {
        const ways = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let combination of ways) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return board.every(cell => cell !== '');
    }

    function render() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }    

    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.addEventListener('click', () => {
            handleMove(index);
        });
    });

    function resetGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        render();
        document.getElementById('status').textContent = '';
    }

    document.getElementById('Reset').addEventListener('click', resetGame);
});
