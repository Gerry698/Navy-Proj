const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Player settings
const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 20,
  height: 20,
  speed: 8,
  health: 100,
  maxHealth: 100,
  bulletSpeed: 3,
  bulletCooldown: 8,
  bulletTimer: 0
};

let level = 2;
// Boss settings
const boss = {
  x: canvas.width / 2,
  y: 50,
  width: 40,
  height: 40,
  
  speed: 5,
  health: 100,
  maxHealth: 100,
  bulletSpeed: 5,
  bulletCooldown: 25 -  level ,
  bulletTimer: 0
};



// Bullets arrays
let playerBullets = [];
let bossBullets = [];

// Key states
const keys = {};

// Event listeners for keyboard input
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

/// character movement update
var moveCharacter = function(dx, dy){
player.x += (dx||0) * player.speed;
player.y += (dy||0) * player.speed;
// player.element.style.left = player.x + 'px';
// player.element.style.top = player.y + 'px';

};

// Update player position, shoot bullets, and check for collisions
function updatePlayer() {
  if (keys['ArrowLeft'] || keys['A'] || keys['a']) {
    moveCharacter(-1, 0);
  }
  if (keys['ArrowRight'] || keys["D"] || keys["d"]) {
    moveCharacter(1, 0);
  }
  if (keys['ArrowUp'] || keys["W"] || keys["w"]) {
    moveCharacter(0, -1);
  }
  if (keys['ArrowDown'] || keys["S"] || keys["s"]) {
    moveCharacter(0, 1);
  }
  

  // Limit player movement within the canvas
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  } else if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  } else if (player.y < canvas.height / 2 - 30) {
    player.y =   canvas.height / 2 - 30;
  }

  // Shooting bullets
  // if (keys[' ']) {
  //   playerBullets.push({
  //     x: player.x + player.width / 2,
  //     y: player.y,
  //     width: 4,
  //     height: 10,
  //     speed: 10
  //   });
  // }
  if (keys[" "]) {
  player.bulletTimer++;
  if (player.bulletTimer >= player.bulletCooldown) {
    playerBullets.push({
      x: player.x - 3,
      y: player.y ,
      width: 3,
      height: 20,
      speed: player.bulletSpeed,
      bulletCooldown: player.bulletCooldown,
    });
    if (level >= 5 ) {
      playerBullets.push({
        x: player.x + player.width ,
        y: player.y ,
        width: 3,
        height: 20,
        speed: player.bulletSpeed,
        bulletCooldown: player.bulletCooldown,
      });
    }
    player.bulletTimer = 0;
  }
  }

  // Check for player collision with boss bullets
  bossBullets.forEach((bullet, index) => {
    if (
      player.x < bullet.x + bullet.width &&
      player.x + player.width > bullet.x &&
      player.y < bullet.y + bullet.height &&
      player.y + player.height > bullet.y
    ) {
      player.health -= 10;
      bossBullets.splice(index, 1);
    }
  });
  bossBullets.forEach((bossbullet, Bindex) => {
    playerBullets.forEach((playerbullet, Pindex) => {
    if (
      playerbullet.x < bossbullet.x + bossbullet.width &&
      playerbullet.x + player.width > bossbullet.x &&
      playerbullet.y < bossbullet.y + bossbullet.height &&
      playerbullet.y + player.height > bossbullet.y
    ) {
      playerBullets.splice(Pindex, 1);
      bossBullets.splice(Bindex, 1);
    }
  });
});
}

// Update boss position, shoot bullets, and check for collisions
function updateBoss() {
  boss.x +=  boss.speed  ;

  // Reverse boss's direction when reaching the canvas edges
  if (boss.x <= 0 || boss.x + boss.width >= canvas.width ) {
    boss.speed *= -1;
  }

  // Shooting bullets
  boss.bulletTimer++;
  if (boss.bulletTimer >= boss.bulletCooldown) {
    bossBullets.push({
      x: boss.x + boss.width / 2,
      y: boss.y + boss.height,
      width: 8,
      height: 8,
      speed: -(boss.bulletSpeed),
      bulletCooldown: boss.bulletCooldown,
    });
    boss.bulletTimer = 0;
  }

 


  // Check for boss collision with player bullets
  playerBullets.forEach((bullet, index) => {
    if (
      boss.x < bullet.x + bullet.width &&
      boss.x + boss.width > bullet.x &&
      boss.y < bullet.y + bullet.height &&
      boss.y + boss.height > bullet.y
    ) {
      boss.health -= 10;
      playerBullets.splice(index, 1);
    }
  });
}

// Update bullets position and remove them if they go offscreen
function updateBullets(bullets) {
  for (let i = bullets.length - 1; i >= 0; i--) {
  // let the bullet bounce one time/ or two? 
    bullets[i].y -= bullets[i].speed;

    // if (bullets[i].y > 0 ) {
    //   bullets[i].y += bullets[i].speed;
    // }
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
    }
  }
}
// Draw health bars for player and boss
function drawHealthBars() {
  ctx.fillStyle = '#f00';
  ctx.fillRect(10, 10, (player.health / player.maxHealth) * 100, 10);

  ctx.fillStyle = '#00f';
  ctx.fillRect(
    canvas.width - 110,
    10,
    (boss.health / boss.maxHealth) * 100,
    10
  );
}
// Function to show the game over page for losing
function showGameOverPage() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '30px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2 - 50);
  ctx.font = '20px Arial';
  ctx.fillText('Press "R" to Restart', canvas.width / 2 - 90, canvas.height / 2);
}
// Function to show the game over page for winning
function showWinPage() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '30px Arial';
  ctx.fillText('You Won !!', canvas.width / 2 - 70, canvas.height / 2 - 50);
  ctx.font = '20px Arial';
  ctx.fillText('Press "R" to Restart', canvas.width / 2 - 90, canvas.height / 2);
}

// Function to restart the game
function resetGame() {
  player.health = player.maxHealth;
  boss.x = canvas.width / 2,
  boss.health = boss.maxHealth;
  boss.speed = 2;
  boss.bulletSpeed = 3;
  boss.bulletCooldown = 50 - level;
  playerBullets = [];
  bossBullets = [];
  level = 2;
  playerDeathCount = 0;
  gameLoop();
}

let playerDeathCount = 0;
//img for Mface
var Mface = document.createElement('img');
Mface.src = 'main character.png';
//img for boss 1
var boss1 = document.createElement('img');
boss1.src = 'boss1.png';
//img for boss 2
var boss2 = document.createElement('img');
boss2.src = 'boss2.png';
//img for boss 3
var boss3 = document.createElement('img');
boss3.src = 'boss3.png';
//img for boss 4
var boss4 = document.createElement('img');
boss4.src = 'boss4.png';
//img for boss 5
var boss5 = document.createElement('img');
boss5.src = 'boss5.png';


// Main game loop
function gameLoop() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  updateBoss();
  updateBullets(playerBullets);
  updateBullets(bossBullets);

  // Draw player
  ctx.fillStyle = '#00f';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  // ctx.drawImage(Mface, player.x, player.y, player.width, player.height);

  // Draw boss 1 2 3 4 5 depedning on level 2 / 3.5 / 5 / 6.5 / 8
  if (level == 2) {
    ctx.drawImage(boss1, boss.x, boss.y, boss.width, boss.height)
  } else if (level == 3.5) {
    ctx.drawImage(boss2, boss.x, boss.y, boss.width, boss.height)
  } else if (level == 5) {
    ctx.drawImage(boss3, boss.x, boss.y, boss.width, boss.height)
  } else if (level == 6.5) {
    ctx.drawImage(boss4, boss.x, boss.y, boss.width, boss.height)
  } else if (level == 8) {
    ctx.drawImage(boss5, boss.x, boss.y, boss.width, boss.height)
  }

  // Draw player bullets
  ctx.fillStyle = '#00f';
  playerBullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });

  // Draw boss bullets
  ctx.fillStyle = '#f00';
  bossBullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });

  drawHealthBars();

  // Check for level completion
  if (boss.health <= 0) {
    // Level complete, reset boss health and increase level
    boss.maxHealth += 100 * level * 2;
    boss.health = boss.maxHealth;
    boss.speed -= level/2  ;
    boss.bulletSpeed += 1 * (level/3);
    boss.bulletCooldown -= 5 + ((level/2)/5);
    player.health = player.health + 10;
    player.bulletCooldown -= 0.5;
    player.bulletSpeed += 1;
    player.speed += 1;
    level += 1.5;
  }

  //pause 
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Esc' ) {
      
    }
  });
  // Check for player death
  if (player.health <= 0) {
    // Player dead, reset player health and boss settings
    player.health = player.maxHealth;
    boss.health = boss.maxHealth;
    boss.speed = 2;
    boss.bulletSpeed = 5;
    boss.bulletCooldown = 50;
    playerDeathCount++;
  }
  // Check for player death
  if (playerDeathCount >= 1) {
    // Show game over page and listen for restart key press
    showGameOverPage();
    document.addEventListener('keydown', (event) => {
      if (event.key === 'r' || event.key === 'R') {
        // resetGame();
        location.reload();
      }
    });
    return; // Exit the game loop if the game is over
  } else  if (level > 8) { // Check for level complete
      // Show game over page and listen for restart key press
      showWinPage();
      document.addEventListener('keydown', (event) => {
        if (event.key === 'r' || event.key === 'R') {
          // resetGame();
          location.reload();
        }
      });
      return; // Exit the game loop if the game is over
    }
    
   
  

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
