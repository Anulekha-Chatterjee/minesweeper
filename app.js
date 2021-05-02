window.onload = function () {
    const board = document.getElementById('board');
    let resetBtn = document.getElementById('reset');
    const noOfBombs = 12;
    const noOfRows = 8;
    const noOfColumns = 8;
    let gameOver = false;
    let score = 0;

    resetBtn.addEventListener('click', reset);
    function reset()
    {
        init();
        displayScore();
    }

    function init() {
        board.innerHTML = "";
        score = 0;
        for (let i = 0; i < noOfRows; i++) {
            row = board.insertRow(i);
            for (let j = 0; j < noOfColumns; j++) {
                block = row.insertCell(j);
                block.setAttribute('class', 'valid');
                block.onclick = function () { clickBlock(this); };
            }
        }
        plantBombs();
    }
    displayScore();
    init();

    function plantBombs() {
        for (let i = 0; i <= noOfBombs; i++) {
            let randomRow = getRandomRowOrColumn();
            let randomcolumn = getRandomRowOrColumn();
            var bombBlock = board.rows[randomRow].cells[randomcolumn];
            bombBlock.setAttribute('class', 'hasBomb');
        }
    }


    function clickBlock(block) {
        if (block.getAttribute("class") === "hasBomb") {
            gameOver = true;
            showAllBombs();
            alert('You lost');
        }
        else {
            block.setAttribute('class', 'clicked');
            score = score + 1;
            var clickedRow = block.parentNode.rowIndex;
            var clickedColumn = block.cellIndex;
            var bombs = 0;
            for (var i = Math.max(clickedRow - 1, 0); i <= Math.min(clickedRow + 1, noOfRows - 1); i++) {
                for (var j = Math.max(clickedColumn - 1, 0); j <= Math.min(clickedColumn + 1, noOfColumns - 1); j++) {
                    if (board.rows[i].cells[j].getAttribute("class") === "hasBomb") {
                        bombs = bombs + 1;
                    };
                }
            }
            block.innerHTML = bombs;
            if (bombs === 0) {
                for (var i = Math.max(clickedRow - 1, 0); i <= Math.min(clickedRow + 1, noOfRows - 1); i++) {
                    for (var j = Math.max(clickedColumn - 1, 0); j <= Math.min(clickedColumn + 1, noOfColumns - 1); j++) {
                        if (board.rows[i].cells[j].innerHTML == "") {
                            clickBlock(board.rows[i].cells[j]);
                        }
                    }
                }

            }
        }
        displayScore();
        declareWin();
    }

function declareWin()
{
    if(score === ((noOfRows*noOfColumns)-noOfBombs))
    {
        alert("You've won the game");
    }
}

    function showAllBombs() {
        if (gameOver) {
            for (let i = 0; i < noOfRows; i++) {
                for (j = 0; j < noOfRows; j++) {
                    if (board.rows[i].cells[j].getAttribute("class") === "hasBomb") {
                        board.rows[i].cells[j].setAttribute('class', 'bombed')
                        board.rows[i].cells[j].innerHTML = "💣";
                    }
                }
            }
        }

    }

    function displayScore()
    {
        document.getElementById('score').innerHTML = "Score: " + score;
    }

    function getRandomRowOrColumn() {
        return Math.floor(Math.random() * 8);
    }
}

