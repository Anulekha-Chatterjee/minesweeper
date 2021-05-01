window.onload = function () {
    const board = document.getElementById('board');
    const noOfMines = 12;
    const noOfRows = 8;
    const noOfColumns = 8;

    function init() {
        board.innerHTML = "";
        for (let i = 0; i < noOfRows; i++) {
            row = board.insertRow(i);
            for (let j = 0; j < noOfColumns; j++) {
                block = row.insertCell(j);
                block.onclick = function () { clickBlock(this); };
            }
        }
        plantBombs();
    }

    init();

    function plantBombs() {
        for (let i = 0; i < noOfMines; i++) {
            let randomRow = getRandomRowOrColumn();
            let randomcolumn = getRandomRowOrColumn();
            var bombBlock = board.rows[randomRow].cells[randomcolumn];
            bombBlock.innerHTML = "X";
        }
    }

    function clickBlock(block) {
        if (block.innerHTML === 'X') {
            alert('You lost')
        }
        else {
            var clickedRow = block.parentNode.rowIndex;
            var clickedColumn = block.cellIndex;
            console.log (clickedRow, clickedColumn)
            block.innerHTML = ((checkEdges(clickedRow, clickedColumn + 1).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow - 1, clickedColumn + 1).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow + 1, clickedColumn + 1).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow, clickedColumn - 1).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow - 1, clickedColumn - 1).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow + 1, clickedColumn - 1).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow - 1, clickedColumn).innerHTML === 'X') | 0)
                + ((checkEdges(clickedRow + 1, clickedColumn).innerHTML === 'X') | 0);

                if(block.innerHTML === '0')
                {
            clickBlock(board.rows[clickedRow].cells[clickedColumn-1]);
        }

       }
   }

    function checkEdges(row, cell) {
        if ((row >= 0) && (cell >= 0) && (row < noOfRows) && (cell < noOfColumns)) {
            return board.rows[row].cells[cell];
        }
        else {
            return board.rows[0].cells[0];
        }
    }

    function getRandomRowOrColumn() {
        return Math.floor(Math.random() * 8);
    }
};
