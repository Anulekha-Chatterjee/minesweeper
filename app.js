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
                block.onclick = function() { clickBlock(this); };
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
            console.log (bombBlock)
            bombBlock.innerHTML = "X";
        }
    }

    function clickBlock(block)
    {
        if(block.innerHTML === 'X')
        {
            alert('You lost')
        }
    }

    function getRandomRowOrColumn() {
        return Math.floor(Math.random() * 8);
    }
};
