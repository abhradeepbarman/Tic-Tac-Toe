const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    //UI box empty
    boxes.forEach((box) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        //missing - HW
        box.classList.remove("win");
    })

    newGameBtn.classList.remove("active");

    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].textContent = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        //check if someone win
        checkGameOver();
    }
}

function swapTurn() {
    if(currentPlayer == 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }

    //UI update
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {

        //all 3 boxes should be non empty & exactly same in value
        if(gameGrid[position[0]] != "" &&
        gameGrid[position[1]] != "" &&
        gameGrid[position[2]] != "" &&
        gameGrid[position[0]] == gameGrid[position[1]] &&
        gameGrid[position[1]] == gameGrid[position[2]]) {

            //check if winner is X
            if(gameGrid[position[0]] == 'X')
                answer = 'X';
            else
                answer = 'O';

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know who is winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    if(answer != "") {
        newGameBtn.classList.add("active");
        gameInfo.textContent = `Winner Player - ${answer}`;
        return;
    }


    //when there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box != "") {
            fillCount++;
        }
    });

    if(fillCount == 9) {
        gameInfo.textContent = `Game Tied!`;
        newGameBtn.classList.add("active");   
    }

}

newGameBtn.addEventListener('click', initGame);