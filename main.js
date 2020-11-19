const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const w = canvasElement.width;
const h = canvasElement.height;

// Iteration 1
function drawGrid(w, h) {
  for (x = 0; x <= w; x += 50) {
    for (y = 0; y <= h; y += 50) {
      context.moveTo(x, 0);
      context.lineTo(x, h);
      context.stroke();
      context.moveTo(0, y);
      context.lineTo(w, y);
      context.stroke();
    }
  }
}

drawGrid(800, 400);

drawEverything();
// Iteration 2: The Character Class
class Charachter {
  constructor(col, row) {
    (this.col = col), (this.row = row);
  }
  moveUp() {
    this.row -= 1;
  }
  moveRight() {
    this.col += 1;
  }
  moveDown() {
    this.row += 1;
  }
  moveLeft() {
    this.col -= 1;
  }
}

// Iteration 3: Drawing the Player
function drawPlayer() {
  const player = new Image();
  player.src = 'images/character-down.png';

  player.addEventListener('load', () => {
    const width = 45;
    const ratio = player.height / player.width;
    context.drawImage(player, 0, 0, width, width * ratio);
  });
}

function drawEverything() {
  drawGrid();
  drawPlayer();
  // drawTreasure()
}
