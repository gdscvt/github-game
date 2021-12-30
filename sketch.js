const [canvasWidth, canvasHeight] = [1000, 400];
let [player, playerSprite, playerCapture] = [undefined, undefined, {}];
let [frameSize, currFrameCount, animIndex] = [6, 0, 0];
let [computerToggle, computer] = [false, undefined];
let [level1] = [undefined];
let [game, environment, envCapture, env1Sprite] = [undefined, [], undefined, undefined];
let [desk1Hcapture, desk2Hcapture, desk3Hcapture, desk4Hcapture, desk5Hcapture, desk1Vcapture, desk2Vcapture] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
function preload() {
  playerSprite = loadImage("/resources/playerSprites.png");
  env1Sprite = loadImage("/resources/assets/env1Sprite.png");
  level1 = loadJSON("./resources/terminalConfigs/level1.json");
}

function setup() {
  captureAllAnimation();
  createCanvas(canvasWidth, canvasHeight);
  game = new Game();
  player = new Player(playerCapture, 50, 50, 6);
  computer = new Computer(600, 0);
  computer.terminal = new Terminal(level1);

  game.initTilemap();
  // environment.push(new EnvObjects(envCapture[0], 20, 20, 352, 63));
  environment.push(new EnvObjects(envCapture[0], 628, 20, 352, 63));
  environment.push(new EnvObjects(envCapture[0], 20, 317, 352, 63));
  environment.push(new EnvObjects(envCapture[0], 628, 317, 352, 63));

  environment.push(new EnvObjects(desk3Hcapture, 450, 100, 50, 50));
  environment.push(new EnvObjects(desk4Hcapture, 500, 100, 50, 50));
  environment.push(new EnvObjects(desk1Hcapture, 450, 185, 50, 50));
  environment.push(new EnvObjects(desk2Hcapture, 500, 185, 50, 50));

  environment.push(new EnvObjects(desk1Vcapture, 425, 125, 25, 50));
  environment.push(new EnvObjects(desk2Vcapture, 550, 125, 25, 50));
  environment.push(new EnvObjects(desk1Vcapture, 425, 165, 25, 50));
  environment.push(new EnvObjects(desk2Vcapture, 550, 165, 25, 50));

  environment.push(new EnvObjects(desk5Hcapture, 20, 20, 50, 50));
  environment.push(new EnvObjects(desk5Hcapture, 20 + 64, 20, 50, 50));
  environment.push(new EnvObjects(desk5Hcapture, 20 + 64 + 64, 20, 50, 50));

  // environment.push(new EnvObjects(envCapture[1], 20, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*1, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*2, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*3, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*4, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*5, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*6, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*7, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*8, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*9, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*10, 83, 40, 20));
  // environment.push(new EnvObjects(envCapture[1], 20 + 40*11, 83, 40, 20));

}

function draw() {
  background(220);
  
  for (obj of game.tiles){
    obj.draw();
  }

  for (obj of game.walls){
    obj.draw();
  }

  for (obj of environment){
    obj.draw();
  }

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
