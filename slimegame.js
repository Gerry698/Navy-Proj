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
let score = 0;
function jump() {
    dino.style.bottom = '100px';
    setTimeout(() => {
        dino.style.bottom = '0';
    }, 300);
}
let time = 0;
let addObstacle = setInterval(pushTime, 750);
function pushTime() {
    time = time + Math.random() * 2000 + 1
    setTimeout(moveObstacle, time)
}
function pushStop() {
    time = time + Math.random() * 2000 + 1
    setTimeout(moveObstacle, time) };
<<<<<<< HEAD
function moveObstacle () {
    if(isGameOver) {
         return;
     }
     let obstacleLeft = 600;
     const obstacleMoveInterval = setInterval(() => {
         if (obstacleLeft > 0 && obstacleLeft < 60) {
             if (dino.classList.contains('jump-animation')) {
                 score++;
                 scoreElement.textContent = `Score: ${score}`;
                            } else {
                clearInterval(obstacleMoveInterval);
                 isGameOver = true;
                 alert('The game is OVER! Refresh to start!');
             }
         }
         obstacleLeft -= 5;
         obstacle.style.left = obstacleLeft + 'px';
         if (obstacleLeft < -20) {
             obstacleLeft = 600;
         }
         if (isGameOver) {
                     return;
                 }
                 let obstacleLeft = 600;
                 const obstacleMoveInterval = setInterval(() => {
                     if (obstacleLeft > 0 && obstacleLeft < 60) {
                         if (dino.classList.contains('jump-animation')) {
                             score++;
                             scoreElement.textContent = `Score: ${score}`;
                         } else {
                             clearInterval(obstacleMoveInterval);
                             isGameOver = true;
                             alert('The game is OVER! Refresh to start!');
                         }
                     }
                     obstacleLeft -= 5;
                     obstacle.style.left = obstacleLeft + 'px';
                     if (obstacleLeft < -20) {
                         obstacleLeft = 600;
                     }
                     if (isGameOver) {
                         clearInterval(obstacleMoveInterval);
                     }
                 }, 10);
             }
            ,function moveObstacle() {
                let obstacleLeft = 600;
                const obstacleMoveInterval = setInterval(() => {
                  obstacleLeft -= 5;
                  obstacle.style.left = obstacleLeft + 'px';
                  // Check for collision
                  if (isColliding(obstacle)) {
                    clearInterval(obstacleMoveInterval);
                    alert('The game is OVER! Refresh to start!');
                  }
                }, 10);
              }
            ,function isColliding(obstacle) {
                const dinoRect = dino.getBoundingClientRect();
                const obstacleRect = obstacle.getBoundingClientRect();
                return !(
                  dinoRect.bottom < obstacleRect.top ||
                  dinoRect.top > obstacleRect.bottom ||
                  dinoRect.right < obstacleRect.left ||
                  dinoRect.left > obstacleRect.right
                );
              }
            ,document.addEventListener('keydown', (event) => {
                if (event.keyCode === 32 || event.keyCode === 38) {
                  jump();  
                }
              }));
            // Function to update the score on the webpage
            function updateScore() {
              scoreElement.textContent = score;
            }
            // Add a keydown event listener to the document
            document.addEventListener('keypress', (event) => {
              // Check if the key pressed is the space key (you can change this to any other key you want)
              if (event.code === 'Space') {
                // Increase the score by 1 when the space key is pressed
                score++;
                // Update the score on the webpage
                updateScore();  }
            });
            // Function to reset the score
            function resetScore() {
              score = 0;
              updateScore();}
              // Get the buttons by their IDs
            const buttonToHomeFromSlime = document.getElementById('buttonToHomeFromSlime');
            
            // Add click event listeners to the buttons
            buttonToHomeFromSlime.addEventListener('click', () => {
              // Redirect to Page 1 (replace 'page1.html' with the actual URL of Page 1)
              window.location.href = 'FrontPage.html';
            });
        }
=======
// function moveObstacle () {
//     if(isGameOver) {
//         return;
//     }
//     let obstacleLeft = 600;
//     const obstacleMoveInterval = setInterval(() => {
//         if (obstacleLeft > 0 && obstacleLeft < 60) {
//             if (dino.classList.contains('jump-animation')) {
//                 score++;
//                 scoreElement.textContent = `Score: ${score}`;
//             } else {
//                 clearInterval(obstacleMoveInterval);
//                 isGameOver = true;
//                 alert('The game is OVER! Refresh to start!');
//             }
//         }
//         obstacleLeft -= 5;
//         obstacle.style.left = obstacleLeft + 'px';
//         if (obstacleLeft < -20) {
//             obstacleLeft = 600;
//         }
//         if (isGameOver) {
//             clearInterval(obstacleMoveInterval);
//         }
//     }, 10);
// }
function moveObstacle() {
    let obstacleLeft = 600;
    const obstacleMoveInterval = setInterval(() => {
      obstacleLeft -= 5;
      obstacle.style.left = obstacleLeft + 'px';
      // Check for collision
      if (isColliding(obstacle)) {
        clearInterval(obstacleMoveInterval);
        alert('The game is OVER! Refresh to start!');
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
// Function to update the score on the webpage
function updateScore() {
  scoreElement.textContent = score;
}
// Add a keydown event listener to the document
document.addEventListener('keypress', (event) => {
  // Check if the key pressed is the space key (you can change this to any other key you want)
  if (event.code === 'Space') {
    // Increase the score by 1 when the space key is pressed
    score++;
    // Update the score on the webpage
    updateScore();
  }
});
// Function to reset the score
function resetScore() {
  score = 0;
  updateScore();}
  // Get the buttons by their IDs
const buttonToHomeFromSlime = document.getElementById('buttonToHomeFromSlime');

// Add click event listeners to the buttons
buttonToHomeFromSlime.addEventListener('click', () => {
  // Redirect to Page 1 (replace 'page1.html' with the actual URL of Page 1)
  window.location.href = 'Main.html';
});
>>>>>>> 1c58c86031bdf42aedd208ea38657f753f720299
