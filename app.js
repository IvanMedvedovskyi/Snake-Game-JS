const gameBoard = document.querySelector(".game__board");
const scoreLayout = document.querySelector(".score");
const recordScoreLayout = document.querySelector(".high__score")

let foodX, foodY;
let snakeHeadX = 5, snakeHeadY = 10;
let movingX = 0, movingY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;

let recordScore = localStorage.getItem("record-score") || 0;
recordScoreLayout.innerHTML = `Record score:${recordScore}`

const RandomFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const moveHead = (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (movingY !== 1) {
                movingX = 0;
                movingY = -1;
            }
            break;

        case "ArrowDown":
            if (movingY !== -1) {
                movingX = 0;
                movingY = 1;
            }
            break;

        case "ArrowLeft":
            if (movingX !== 1) {
                movingX = -1;
                movingY = 0;
            }
            break;

        case "ArrowRight":
            if (movingX !== -1) {
                movingX = 1;
                movingY = 0;
            }
            break;
    }
}

const HandlerGameOver = () => {
    clearInterval(setIntervalId);
    alert('Your are lose! Press "OK" to restart the game!')
    location.reload();
}

const LoaderGame = () => {
    if(gameOver) return HandlerGameOver()
    let htmlLayout = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

    if(snakeHeadX === foodX && snakeHeadY === foodY) {
        RandomFoodPosition()
        snakeBody.push([foodX, foodY]);
        score++;


        recordScore = score >= recordScore ? score : recordScore;
        localStorage.setItem("record-score", recordScore)

        scoreLayout.innerHTML = `Score:${score}`;
        recordScoreLayout.innerHTML = `Record score:${recordScore}`;
        
    }

    for(let i = snakeBody.length - 1 ; i>0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    snakeBody[0] = [snakeHeadX, snakeHeadY];

    snakeHeadX += movingX;
    snakeHeadY += movingY;

    if(snakeHeadX <=0 || snakeHeadX >30 || snakeHeadY <=0 || snakeHeadY >30){
        gameOver = true;
    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlLayout += `<div class="snake__head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`

        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    gameBoard.innerHTML = htmlLayout;
}

RandomFoodPosition()
setIntervalId = setInterval(LoaderGame, 125)

document.addEventListener("keydown", moveHead)