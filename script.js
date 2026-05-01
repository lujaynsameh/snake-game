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
let highscore=null;



let running = false;
let xspeed = unitsize;
let yspeed = 0;

let foodX;
let foodY;
let score = 0;
let snake = [
   
    {x:unitsize*4 , y:0},
    {x:unitsize*3 , y:0},
    {x:unitsize*2 , y:0}, 
    {x:unitsize , y:0},
    {x:0 , y: 0}
];

window.addEventListener("keydown" , changeDirection);
resetbutt.addEventListener("click" , resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    highscore = localStorage.getItem("highscore");
    if (highscore==null){
        highscore = 0 ;
        highscoreText.textContent= 0;
    }
   // drawSnake();
    generateFood();
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
        } ,70);
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
        generateFood();
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
  // const key = 
  // also use wasd keys 
     const keyPressed = event.key;
     //is y vel = -unisize condition 
     //question why is it the signs like  that
     const goUp= (yspeed== -unitsize);
     const goDown= (yspeed== unitsize);
     const goLeft= (xspeed== -unitsize);
     const goRight= (xspeed== unitsize);

     switch  (true){
        case((keyPressed == "ArrowUp" || keyPressed == "w") && !goDown):
            xspeed=0;
            yspeed= -unitsize;
            break;
        //if we wanna go DOWN 
        case((keyPressed=="ArrowDown" || keyPressed== "s") && !goUp):
            xspeed = 0;
            yspeed = unitsize;
            break;
            // go LEFT
        case((keyPressed== "ArrowLeft"|| keyPressed== "a") && !goRight):
            xspeed= -unitsize;
            yspeed= 0 ;
            break;
         case((keyPressed== "ArrowRight"|| keyPressed=="d") && !goLeft):
            xspeed= unitsize;
            yspeed= 0 ;
            break;
     };
 
  console.log(event.key);
     
};
function checkGameOver(){
    switch(true){
        case(snake.slice(1).some(bodypart=> bodypart.x===snake[0].x && bodypart.y === snake[0].y)):
            running = false;
            break;
        case(snake[0].x < 0||snake[0].x >= gameWidth ||snake[0].y < 0 
            || snake[0].y >= gameHeight):
            running = false;
            break;
    }
    
        if(score>highscore){
            localStorage.setItem("highscore",score);
            highscoreText.textContent = score;
    
    }
    // displayGameOver();
};
function displayGameOver(){
    //ctx.fillStyle="pink";
    ctx.fillStyle="rgba(99, 6, 6, 0.56)";
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    ctx.font = "60px 'Luxurious Script'";
    ctx.fillStyle= "pink";
    ctx.textAlign ="center" ;
    ctx.fillText("Game  Over !", gameWidth/2, gameHeight/2);

};
function resetGame(){
    if (!running){
         score=0;
    xspeed=unitsize;
    yspeed=0;
    snake = [
   
    {x:unitsize*4 , y:0},
    {x:unitsize*3 , y:0},
    {x:unitsize*2 , y:0}, 
    {x:unitsize , y:0},
    {x:0 , y: 0}
];
    running = false;
    gameStart();

    }
   

    
};