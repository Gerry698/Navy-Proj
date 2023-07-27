// Get the score element
const scoreElement = document.getElementById('score');

// Initialize the score
let score = 0;

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
  updateScore();
}