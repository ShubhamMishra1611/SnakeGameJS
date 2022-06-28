//constant and variables
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscore = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscore))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscore.innerHTML = "High Score: " + hiscore;
}
let direction = { x: 0, y: 0 };
const foodsound = new Audio("point.wav");
const gameoversound = new Audio("gameover.wav");
const movesound = new Audio("drxn.wav");
const music = new Audio("music.mp3");
let speed = 10;
lastPaintTime = 0;
let score = 0;
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

//functions
music.play();
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 50 || snake[0].x <= 0 || snake[0].y >= 50 || snake[0].y <= 0) {
        return true;
    }

    return false;
}
function gameEngine() {
    //updating snake array and food

    //render the snake and food
    if (isCollide(snakearr)) {
        gameoversound.play();
        music.pause();
        direction = { x: 0, y: 0 };
        alert("Game Over!!!");
        snakearr = [{ x: 13, y: 15 }];
        music.play();
        score = 0;
    }
    //if you have taken the food
    if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
        // foodsound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakearr.unshift({ x: snakearr[0].x + direction.x, y: snakearr[0].y + direction.y });
        let a = 2;
        let b = 48;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].y += direction.y;
    snakearr[0].x += direction.x;
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    //display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    direction = { x: 0, y: 1 };//start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
})
