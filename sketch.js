const [canvasWidth, canvasHeight] = [1000, 400];
let [xPos, yPos, player] = [0, 0];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  // player = new Player();
}

function draw() {
  background(220);
  // player.draw();
  rect(0, 0, 20, 20);
}
