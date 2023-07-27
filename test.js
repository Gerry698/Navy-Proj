const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');
let isJumping = false;

function jump() {
  if (isJumping) return;

  isJumping = true;
  let position = 0;
  const jumpInterval = setInterval(() => {
    if (position === 150) {
      clearInterval(jumpInterval);
      let downInterval = setInterval(() => {
        if (position === 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 20;
        dino.style.bottom = position + 'px';
      }, 25);
    }
    position += 20;
    dino.style.bottom = position + 'px';
  }, 25);
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

function moveObstacle() {
  let obstaclePosition = 600;
  const moveObstacleInterval = setInterval(() => {
    if (obstaclePosition === -20) {
      clearInterval(moveObstacleInterval);
      obstaclePosition = 600;
    }
    obstaclePosition -= 10;
    obstacle.style.left = obstaclePosition + 'px';

    if (obstaclePosition === 50) {
      // Check for collision
      const dinoPosition = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
      if (dinoPosition <= 50) {
        alert('Game Over! Press OK to restart.');
        location.reload();
      }
    }
  }, 50);
}

moveObstacle();
