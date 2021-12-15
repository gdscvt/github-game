let playerCapture = {};
let playerSprite;
let currFrameCount = 0;
let frameSize = 6;
let y = 100;
function preload(){
  playerSprite = loadImage('/resources/playerSprites.png');
}
let index;
function setup() {
  captureAllAnimation();
  createCanvas(400, 400);
  index = 0;
}

function draw() {
  background(220);
  index = floor(index)%frameSize;
  image(playerCapture['up'][index], 100, y, 32, 32)  ;
  if(frameCount - currFrameCount > 10)
    {
      y++
      index++;
    currFrameCount = frameCount;}
}
