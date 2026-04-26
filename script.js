const gameBoard = document.querySelector("#gameBoard");
const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetbutt = document.querySelector("#resetButt");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "blanchedalmond";
const snakeColor = "pink";
const snakeBorder = "brown";
const apple = "red";
const unitsize = 20;

let running = false;
let xspeed = unitsize;
let yspeed = 0;

let foodX;
let foodY;
let score = 0;
let snake = [
    {x:0 , y: 0},
    {x:unitsize , y:0},
    {x:unitsize*2 , y:0},
    {x:unitsize*3 , y:0},
    {x:unitsize*4 , y:0}
];

window.addEventListener("keydown" , changeDirection);
resetbutt.addEventListener("click" , resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    generateFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if (running){
        setTimeout(()=>{
            clear();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        } ,100);
    }

    else {
        displayGameOver();
    }
};
function clear(){
    ctx.fillStyle=boardBackground;
    ctx.fillRect(0,0 ,gameWidth, gameHeight);

};
function generateFood(){
   function randomFood(min, max){
         const num =Math.round((Math.random() * (max-min) + min) / unitsize) * unitsize;
         return num; 
}
    foodX = randomFood(0,gameWidth - unitsize);
    foodY = randomFood(0,gameWidth - unitsize);
};

function drawFood(){
    
    ctx.fillStyle = apple;
    ctx.fillRect(foodX, foodY, unitsize, unitsize);
};
function moveSnake(){
    const head = {x: snake[0].x + xspeed,
                 y: snake[0].y + yspeed};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY ){
        //score++
        score+=1;
        scoreText.textContent= score;
        generateFood;
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle= snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y , unitsize ,unitsize);
        ctx.strokeRect(snakePart.x, snakePart.y , unitsize ,unitsize);
    });
};

function changeDirection(event){
   const key = event.keyCode;
     console.log(key);
};
function checkGameOver(){};
function displayGameOver(){};
function resetGame(){};