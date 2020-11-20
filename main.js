const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const w = canvasElement.width;
const h = canvasElement.height;
const tileCount = 10;
const tileSize = w / tileCount;

// Iteration 1
function drawGrid() {
  context.lineWidth = 1;
  for (x = 0; x <= h; x += tileSize) {
    for (y = 0; y <= w; y += tileSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, h);
      context.stroke();
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(w, y);
      context.stroke();
    }
  }
}

// Iteration 2: The Character Class

class Character {
  constructor(initialCol, initalRow) {
    (this.col = initialCol),
      (this.row = initalRow),
      (this.direction = 'down'),
      (this.score = 0);

    const imagePaths = {
      left: 'images/character-left.png',
      up: 'images/character-up.png',
      right: 'images/character-right.png',
      down: 'images/character-down.png'
    };

    this.images = {};

    for (let direction in imagePaths) {
      this.images[direction] = new Image();
      this.images[direction].src = imagePaths[direction];
    }
  }

  moveUp() {
    this.row--;
    this.direction = 'up';
  }
  moveDown() {
    this.row++;
    this.direction = 'down';
  }
  moveRight() {
    this.col++;
    this.direction = 'right';
  }

  moveLeft() {
    this.col--;
    this.direction = 'left';
  }
}
const player = new Character(0, 0);
// Iteration 3: Drawing the Player

function drawPlayer() {
  context.drawImage(
    player.images[player.direction],
    player.col * tileSize,
    player.row * tileSize,
    tileSize,
    tileSize
  );
}

//Iteration 4: The Treasure Class

class Treasure {
  constructor() {
    this.setRandomPosition();

    this.image = new Image();
    this.image.src = 'images/treasure.png';
  }

  setRandomPosition() {
    this.col = Math.floor(Math.random() * tileCount);
    this.row = Math.floor(Math.random() * tileCount);
  }
}
const treasure = new Treasure();

function drawTreasure() {
  context.drawImage(
    treasure.image,
    treasure.col * tileSize,
    treasure.row * tileSize,
    tileSize,
    tileSize
  );
}

document.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  const key = event.key;
  switch (key) {
    case 'ArrowLeft':
      player.moveLeft();
      break;
    case 'ArrowUp':
      player.moveUp();
      break;
    case 'ArrowRight':
      player.moveRight();
      break;
    case 'ArrowDown':
      player.moveDown();
      break;
  }

  if (player.row === treasure.row && player.col === treasure.col) {
    player.score++;
    // Add score to html - it  does not work the way I want it to :(
    const newElement = document.createElement('span');
    newElement.innerText = ` ${player.score}`;
    const scoreId = document.getElementById('score');
    scoreId.appendChild(newElement);
    treasure.setRandomPosition();
  }
  drawEverything();
});

function drawEverything() {
  context.clearRect(0, 0, w, h);
  drawGrid();
  drawPlayer();
  drawTreasure();
}

setTimeout(drawEverything, 500);
