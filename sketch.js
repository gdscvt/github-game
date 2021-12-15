const [canvasWidth, canvasHeight] = [1000, 400];
let [player, playerSprite, playerCapture] = [undefined, undefined, {}];
let [frameSize, currFrameCount, animIndex] = [6, 0, 0];

function preload() {
  playerSprite = loadImage("/resources/playerSprites.png");
}

function setup() {
  captureAllAnimation();
  createCanvas(canvasWidth, canvasHeight);
  player = new Player(playerCapture, 50, 50, 6);
}

function draw() {
  background(220);
  player.draw();
  if (frameCount - currFrameCount > 10) {
    animIndex = floor(animIndex + 1) % frameSize;
    currFrameCount = frameCount;
  }
}
