const [canvasWidth, canvasHeight] = [1000, 400];
let [player, playerSprite, playerCapture] = [undefined, undefined, {}];
let [frameSize, currFrameCount, animIndex] = [6, 0, 0];
let [computerToggle, computer] = [false, undefined];
let [currLvlIndex, level1, level2] = [1, undefined];
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
const [START, INSTRUCTIONS, GAME] = [0, 1, 2];

function preload() {
  playerSprite = loadImage("/resources/playerSprites.png");
  env1Sprite = loadImage("/resources/assets/env1Sprite.png");
  level1 = loadJSON("./resources/terminalConfigs/level1.json");
  level2 = loadJSON("./resources/terminalConfigs/level2.json");
  doorSprite = loadImage("/resources/assets/doors.png");
}

function setup() {
  captureAllAnimation();
  createCanvas(canvasWidth, canvasHeight);
  game = new Game();
  player = new Player(playerCapture, 50, 100, 6);
  computer = new Computer(600, 0);
  computer.terminal = new Terminal(level1);
  // popup = new Popup("Interact with server 1 plz\n");

  game.initTilemap();

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
  } else if (game.state == GAME) {
    for (obj of game.tiles) {
      obj.draw();
    }

    for (obj of environment) {
      obj.draw();
    }
    game.doors.draw();

    if (game_win) {
      game.doors.open();
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
    if (popupToggle) {
      popup.draw();
    }

    for (obj of game.walls) {
      obj.draw();
    }
  }

  if (changeLvl) {
    switch (currLvlIndex++) {
      case 2:
        computer.terminal = new Terminal(level2);
        break;
      default:
        // change to end screen here
        // computer.terminal = new Terminal(level2);
        break;
    }
  }
  changeLvl = false;
}

// Only activated, if the key is released
function keyReleased() {
  let currKey;
  if (keycodeMap[keyCode]) {
    currKey = capitalize
      ? keycodeMap[keyCode].toUpperCase()
      : keycodeMap[keyCode];
  }

  if (!popupToggle && (currKey === "h" || currKey === "H") && !computerToggle) {
    console.log("Hint message wanted!");
    popupToggle = !popupToggle;
  } else if (
    popupToggle &&
    !computerToggle &&
    (currKey === "h" || currKey === "H")
  ) {
    popupToggle = !popupToggle;
  }

  if (!computerToggle && (currKey === "c" || currKey === "C")) {
    let obj = environment[key_table];
    // if (
    //   player.check_collision(
    //     [player.x, player.y],
    //     obj,
    //     obj.width / 2 + 16 + 5,
    //     obj.height / 2 + 16 + 5
    //   )
    // ) {
    if (!computerToggle) {
      computerToggle = true;
    }
    // }
  } else if (computerToggle) {
    if (keyCode == 8 && computer.code.length >= 3)
      computer.code = computer.code.slice(0, -1);
    else if (keyCode == 13) computer.terminal.parse(computer.code);
    else if (keyCode === 20) capitalize = !capitalize;
    else if (currKey !== undefined) computer.code += currKey;
  }
}
