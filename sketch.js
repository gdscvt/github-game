const [canvasWidth, canvasHeight] = [1000, 400];
let [playerSprite, playerCapture] = [undefined, {}];
let [computerToggle, computer] = [false, undefined];
let [currLvlIndex, level1, level2] = [1, undefined, undefined];
let [game, environment, envCapture, env1Sprite] = [
  undefined,
  [],
  undefined,
  undefined,
];
let [
  desk1Hcapture,
  desk2Hcapture,
  desk3Hcapture,
  desk4Hcapture,
  desk5Hcapture,
  desk1Vcapture,
  desk2Vcapture,
] = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
let [popupToggle, popup] = [false, undefined];
let chair = undefined;
let [cabinet1, cabinet2, cabinet3] = [undefined, undefined, undefined];
let doors = [];
let game_win = false;
let changeLvl = false;
let key_table = undefined;
let key_door = undefined;
const [START, INSTRUCTIONS, GAME, GAMEOVER] = [0, 1, 2, 3];

function preload() {
  playerSprite = loadImage("./assets/playerSprites.png");
  env1Sprite = loadImage("./assets/env1Sprite.png");
  level1 = loadJSON("./assets/terminalConfigs/level1.json");
  level2 = loadJSON("./assets/terminalConfigs/level2.json");
  doorSprite = loadImage("./assets/doors.png");
}

function setup() {
  captureAllAnimation();
  createCanvas(canvasWidth, canvasHeight);
  game = new Game();
  
  // popup = new Popup("Interact with server 1 plz\n");

  environment.push(new EnvObjects(desk3Hcapture, 450 - 7, 95, 64, 64));
  environment.push(new EnvObjects(desk4Hcapture, 500 - 7, 95, 64, 64));
  environment.push(new EnvObjects(desk1Hcapture, 450 - 7, 205, 64, 64));
  environment.push(new EnvObjects(desk2Hcapture, 500 - 7, 205, 64, 64));

  environment.push(new EnvObjects(desk2Vcapture, 418 - 7, 132, 32, 64));
  environment.push(new EnvObjects(desk1Vcapture, 564 - 7, 132, 32, 64));

  environment.push(new EnvObjects(chair, 418 - 30, 150, 24, 24));

  // Key computer
  environment.push(new EnvObjects(desk2Vcapture, 418 - 7, 172, 32, 64));
  key_table = environment.length - 1;
  environment.push(new EnvObjects(desk1Vcapture, 564 - 7, 172, 32, 64));

  environment.push(new EnvObjects(chair, 564 + 26, 150, 24, 24));
  environment.push(new EnvObjects(chair, 564 + 26, 190, 24, 24));

  environment.push(new EnvObjects(desk1Hcapture, 20, 20, 64, 64));
  environment.push(new EnvObjects(desk2Hcapture, 20 + 64, 20, 64, 64));
  environment.push(new EnvObjects(desk5Hcapture, 20 + 64 * 2, 20, 64, 64));
  environment.push(new EnvObjects(desk1Hcapture, 20 + 64 * 3, 20, 64, 64));
  environment.push(new EnvObjects(desk2Hcapture, 20 + 64 * 4, 20, 64, 64));

  environment.push(new EnvObjects(desk1Hcapture, 660, 20, 64, 64));
  environment.push(new EnvObjects(desk2Hcapture, 660 + 64, 20, 64, 64));
  environment.push(new EnvObjects(desk5Hcapture, 660 + 64 * 2, 20, 64, 64));
  environment.push(new EnvObjects(desk1Hcapture, 660 + 64 * 3, 20, 64, 64));
  environment.push(new EnvObjects(desk2Hcapture, 660 + 64 * 4, 20, 64, 64));

  environment.push(new EnvObjects(desk3Hcapture, 20, 330, 64, 64));
  environment.push(new EnvObjects(desk4Hcapture, 20 + 64, 330, 64, 64));
  // environment.push(new EnvObjects(desk5Hcapture, 20 + 64 * 2, 330, 64, 64));
  environment.push(new EnvObjects(desk3Hcapture, 20 + 64 * 3, 330, 64, 64));
  environment.push(new EnvObjects(desk4Hcapture, 20 + 64 * 4, 330, 64, 64));

  environment.push(new EnvObjects(desk3Hcapture, 660, 330, 64, 64));
  environment.push(new EnvObjects(desk4Hcapture, 660 + 64, 330, 64, 64));
  // environment.push(new EnvObjects(desk5Hcapture, 660 + 64 * 2, 330, 64, 64));
  environment.push(new EnvObjects(desk3Hcapture, 660 + 64 * 3, 330, 64, 64));
  environment.push(new EnvObjects(desk4Hcapture, 660 + 64 * 4, 330, 64, 64));
}

function draw() {
  background(220);

  if (game.state == START) {
    
    game.drawStartScreen();

  } else if (game.state == INSTRUCTIONS) {
    
    game.drawInstructionsScreen();

  } else if (game.state == GAMEOVER) {
    
    game.drawEndScreen();

  } else if (game.state == GAME) {

    game.drawGameScreen();

  }
}


