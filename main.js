//The Compliment thingy
let complimentbank = [""]
let mrmikecomplimentbank = ["You're cruising through this!", "Wow! You did that so quickly! That was magic!", "Ben bought cookies, you all can have a piece.", "Yay"]





//game
const dino = document.getElementById('dino');
const obstacle = document.querySelector('#obstacle')
const scoreElement = document.getElementById('score');
document.addEventListener('keydown', event => {
    move();
});

function move() {
    if (!obstacle.classList.contains('move')) {
        obstacle.classList.add('move');
    }
}

let isGameOver = false;
let score = 50;


function jump() {
 dino.style.bottom = '100px';
setTimeout(() => {

    dino.style.bottom = '0';
}, 300);
}

function moveObstacle () {
let obstacleLeft = 600;
let randomDelay = Math.random() * 2000 + 1000;

const obstacleMoveInterval = setInterval(() => {
    if (obstacleLeft > 0 && obstacleLeft < 60) {

        if (dino.classList.contains('jump-animation')) {
        score++;
        scoreElement.textContent = 'Score: ${score}';
     } else {
        clearInterval(obstacleMoveInterval);
        isGameOver = true;
        alert('The game is OVER! Refresh to start! Your Final Score: ' + score);
    }
}

obstacleLeft -= 5;
obstacle.style.left = obstacleLeft + 'px';

if (obstacleLeft < -20) {

    obstacleLeft = 600;
    randomDelay = Math.random() * 2000 + 1000;
}
if (isGameOver) {
    clearInterval(obstacleMoveInterval);
}
}, 10);
if (!isGameOver) {
setTimeout(moveObstacle, randomDelay);
}
}




function moveObstacle() {
    let obstacleLeft = 600;
    const obstacleMoveInterval = setInterval(() => {
      obstacleLeft -= 5;
      obstacle.style.left = obstacleLeft + 'px';
  
      // Check for collision
      if (isColliding(obstacle)) {
        clearInterval(obstacleMoveInterval);
        alert('The game is OVER! You collided with the obstacle. Your Final Score:');
      }
    }, 10);
  }
  
  function isColliding(obstacle) {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
  
    return !(
      dinoRect.bottom < obstacleRect.top ||
      dinoRect.top > obstacleRect.bottom ||
      dinoRect.right < obstacleRect.left ||
      dinoRect.left > obstacleRect.right
    );
  }

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32 || event.keyCode === 38) {
    jump();  
  }
});

moveObstacle ();



//satisfying thing