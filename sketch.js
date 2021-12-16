const [canvasWidth, canvasHeight] = [1000, 400];
let [player, playerSprite, playerCapture] = [undefined, undefined, {}];
let [frameSize, currFrameCount, animIndex] = [6, 0, 0];
let [computerToggle, computer] = [false, undefined];
let [level1] = [undefined];

function preload() {
  playerSprite = loadImage("/resources/playerSprites.png");
  level1 = loadJSON("./resources/terminalConfigs/level1.json");
}

function setup() {
  captureAllAnimation();
  createCanvas(canvasWidth, canvasHeight);
  player = new Player(playerCapture, 50, 50, 6);
  computer = new Computer(600, 0);
  computer.terminal = new Terminal(level1);
}

function draw() {
  background(220);
  player.draw();
  if (frameCount - currFrameCount > 10) {
    animIndex = floor(animIndex + 1) % frameSize;
    currFrameCount = frameCount;
  }

  // If the computer is used
  if (computerToggle) {
    computer.draw();
    computer.coding();
    computer.onKeyPressed();
    animIndex = 1;
  } else {
    player.onKeyPressed();
  }
}

// Only activated, if the key is released
function keyReleased() {
  let currKey;
  if (keycodeMap[keyCode]) {
    currKey = capitalize
      ? keycodeMap[keyCode].toUpperCase()
      : keycodeMap[keyCode];
  }

  if (!computerToggle && (currKey === "c" || currKey === "C")) {
    computerToggle = true;
  } else if (computerToggle) {
    if (keyCode == 8 && computer.code.length >= 3)
      computer.code = computer.code.slice(0, -1);
    else if (keyCode == 13) computer.terminal.parse(computer.code);
    else if (keyCode === 20) capitalize = !capitalize;
    else if (currKey !== undefined) computer.code += currKey;
  }
}
