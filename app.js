

let ctx = document.getElementById("ctx").getContext('2d');
ctx.font = '20px  calibri'
ctx.fillText('PRESS SPACE BAR TO START GAME', 150, 250)
// ctx.fillText('this not working ', 100, 100);

const height = 500;
const width = 500;
const tileList = [];
let numOfTiles = 0;
let score;
let intervalValue;
let hitCount;
let running = false;
// let key = event.key || event.keyCode;

let ball = {
    x: 0,
    y: 0,
    radius: 5,
    color: 'blue',
    speedX: -5,
    speedY: -5,
}

let base = {
    x: 0,
    y: 400,
    width: 100,
    height: 20,
    color: 'red',
    pressingLeft: false,
    pressingRight: false,
    lives: 0,
}

let tile = {
    height: 20,
    width: 40,
    color: 'orange',
}

document.getElementById('ctx').onmousedown = function () {
    if (running) {
        running = false;
        clearInterval(intervalValue);
    }
    startGame()

}


document.onkeydown = function (event) {
    if (event.key == 37) {
        base.pressingLeft = true;
        base.pressingRight = false;

    }
    else if (event.key == 39) {
        base.pressingLeft = false;
        base.pressingRight = true;
    }

}

document.onkeyup = function (event) {
    if (event.key == 37) {
        base.pressingLeft = false;


    }
    else if (event.key == 39) {
        base.pressingRight = false;
    }

}

const testCollision = (base, ball) => {
    return ((base.x < ball.x + 2 * ball.radius) &&
        (ball.x > base.x + base.width) &&
        (base.y > ball.y + 2 * ball.radius) &&
        (ball.y > base.y + base.height))
}


const tileCollision = (t, ball) => {
    return ((t.x < ball.x + 2 * ball.radius) &&
        (ball.x > t.x + tile.width) &&
        (t.y > ball.y + 2 * ball.radius) &&
        (ball.y > t.y + tile.height))
}
const drawBall = () => {
    ctx.save();
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill()
    ctx.restore();
}

const drawBase = () => {
    ctx.save();
    ctx.fillStyle = base.color;
    ctx.fillRect(base.x, base.y, base.width, base.height);

    ctx.restore();
}



const drawTile = (t, index) => {
    ctx.save()
    ctx.fillStyle = tile.color;
    ctx.fillRect(t.x, t.y, tile.width, tile.height);
    ctx.restore()
}
const updateBasePosition = () => {


    if (base.pressingLeft) {

        base.x = base.x - 5

    } else if (base.pressingRight) {

        base.x = base.x + 5;

    } else if (base.x < 0) {
        base.x = 0
    } else if (base.x > (width - base.width)) {
        base.x = (width - base.width);
    }



}


const updateBallPosition = () => {

    ball.x += ball.speedX;
    ball.y += ball.speedY;
    if (ball.x > width || ball.x < 0) {
        hitCount++
        if (hitCount % 10 === 0) {
            ball.x = (Math.abs(ball.speedX) + 1)
        } else {
            ball.speedX += 1;
        }
        ball.x = -ball.speedX;
    }

    if (ball.y < 0) {
        hitCount++
        if (hitCount % 10 === 0) {
            ball.y = (Math.abs(ball.speedY) + 1)
        } else {
            ball.speedy += 1;
        }
        ball.y = -ball.speedY;
    }
    if (ball.y > height) {
        hitCount++
        if (hitCount % 10 === 0) {
            ball.y = (Math.abs(ball.speedY) + 1)
        } else {
            ball.speedY += 1;
        }
        ball.y = -ball.speedY;
        base.lives--;
    }

}

const isGameOver = () => {
    if (base.lives === 0 || score == 330) {
        clearInterval(intervalValue);
        ctx.fiLlText('GAME OVER !  CLICK TO START GAME AGAIN', 150, 250)
    }
}

const updateGame = () => {
    ctx.clearRect(0, 0, width, height);

    if (testCollision(base, ball)) {
        ball.speedY = -ball.speedY;
    }

    tileList.forEach(drawTile)

    for (key in tileList) {
        if (tileCollision(tileList[key], ball)) {
            delete tileList[key];
            ball.speedY = -ball.speedY;
            score += 10;
        }

  
    }
    ctx.fillText('Score: ' + score, 5, 490);
    ctx.fillText('Lives: ' + base.lives, 430, 490);


    updateBasePosition();
    updateBallPosition();
    drawBall();
    drawBase();
}


const startGame = () => {
    base.x = Math.floor(Math.random() * 100) + 1;
    ball.x = base.x + 100;
    ball.y = base.y - 100;
    let tileX = 5;
    let tileY = 5;
    score = 0;
    base.lives = 3;
    running = true;
    hitCount = 0;
    for (let i = 0; i <= 6; i++) {
        tileX = 5;
        for (let j = 0; j <= 11; j++) {
            tileList[numOfTiles] = { x: tileX, y: tileY };
            numOfTiles++;
            tileX += 45;

        }
        tileY += 25;
    }
    intervalValue = setInterval(updateGame, 20);

}

