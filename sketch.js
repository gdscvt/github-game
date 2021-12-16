const [canvasWidth, canvasHeight] = [1000, 400];
let [player, playerSprite, playerCapture] = [undefined, undefined, {}];
let [frameSize, currFrameCount, animIndex] = [6, 0, 0];
let [computerToggle, computer] = [false, undefined];

function preload() {
  playerSprite = loadImage("/resources/playerSprites.png");
}

function setup() {
  captureAllAnimation();
  createCanvas(canvasWidth, canvasHeight);
  player = new Player(playerCapture, 50, 50, 6);
  computer = new Computer(600, 0);
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
    animIndex = 1;
  } else {
    player.onKeyPressed();
  }
}

// Only activated, if the key is released
function keyReleased() {
  if (!computerToggle && keyCode == 67) {
    computerToggle = true;
  }
  if (computerToggle) {
    if (keyCode == 71) {
      computer.code += "g";
    } else if (keyCode == 69) {
      computer.code += "e";
    } else if (keyCode == 88) {
      computer.code += "x";
    } else if (keyCode == 69) {
      computer.code += "e";
    } else if (keyCode == 69) {
      computer.code += "e";
    } else if (keyCode == 73) {
      computer.code += "i";
    } else if (keyCode == 84) {
      computer.code += "t";
    } else if (keyCode == 80) {
      computer.code += "p";
    } else if (keyCode == 85) {
      computer.code += "u";
    } else if (keyCode == 76) {
      computer.code += "l";
    } else if (keyCode == 32) {
      computer.code += " ";
    } else if (keyCode == 186) {
      computer.code += ";";
    } else if (keyCode == 8) {
      if (computer.code.length >= 3) {
        computer.code = computer.code.slice(0, -1);
      }
    } else if (keyCode == 13) {
      if (computer.code.length >= 3) {
        print("here1");
        switch (computer.code.substr(2, computer.code.length)) {
          case "exit":
            computer.code = "> ";
            computerToggle = false;
            break;

          case "git pull":
            print("here");
            computer.display += "\n" + computer.code + "\nFile pulled.";
            computer.code = "> ";
            break;
        }
      }
    }
  }
}
