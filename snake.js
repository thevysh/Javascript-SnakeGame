var canvas, ctx, head, apple, body;
var bodys, apple_x, apple_y;

const BODY_SIZE=10;
const ALL_BODY=900;
const MAX_RAND=29;
const DELAY=140;
const C_HEIGHT=600;
const C_WIDTH=600;

const LEFT_KEY=37;
const RIGHT_KEY=39;
const UP_KEY=38;
const DOWN_KEY=40;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;

var x = new Array(ALL_BODY);
var y = new Array(ALL_BODY);


function init(){
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}

function loadImages(){
    head = new Image();
    head.src = 'red-head.png';

    body = new Image();
    body.src = 'green-body.png';

    apple = new Image();
    apple.src = 'apple.png';
}

function createSnake(){
    bodys = 3;
    for (var z = 0; z < bodys; z++){
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkApple(){
    if ((x[0]== apple_x) && (y[0]==apple_y)){
        bodys++;
        locateApple();
    }
}

function doDrawing(){
    ctx.clearRect(0,0,C_WIDTH,C_HEIGHT);
    if (inGame){
        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < bodys; z++){
            if (z==0){
                ctx.drawImage(head, x[z],y[z]);
            }
            else{
                ctx.drawImage(body, x[z],y[z]);
            }
        }
    } else {
        gameOver();
    }
}

function gameOver(){
    ctx.fillStyle='white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal italic 22px serif';

    ctx.fillText('Game Over', C_WIDTH/2, C_HEIGHT/2);
}

function move() {

    for (var z = bodys; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
        x[0] -= BODY_SIZE;
    }

    if (rightDirection) {
        x[0] += BODY_SIZE;
    }

    if (upDirection) {
        y[0] -= BODY_SIZE;
    }

    if (downDirection) {
        y[0] += BODY_SIZE;
    }
}    


function checkCollision(){
    for (var z = bodys; z > 0; z--){
        if ((z>4) && (x[0]==x[z]) && (y[0] == y[z])){
            inGame = false;
        }
    }

    if (y[0]>=C_HEIGHT){
        inGame = false;
    }
    if(y[0]<0){
        inGame = false;
    }
    if(x[0]>=C_WIDTH){
        inGame = false;
    }
    if(x[0]<0){
        inGame=false;
    }
        
}

function locateApple(){
    var r = Math.floor(Math.random()*MAX_RAND);
    apple_x = r * BODY_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * BODY_SIZE;
}

function gameCycle(){
    if (inGame){
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e){
    var key = e.keyCode;

    if((key == LEFT_KEY) && (!rightDirection)){
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)){
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if((key == UP_KEY) && (!downDirection)){
        upDirection = true;
        leftDirection = false;
        rightDirection = false;
    }

    if((key == DOWN_KEY) && (!upDirection)){
        downDirection = true;
        leftDirection = false;
        rightDirection = false;
    }
};