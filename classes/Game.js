let [startPressed, instPressed, backPressed] = [false, false, false];

function Game() {
  
  this.level = undefined;
  this.state = 0;
  this.player = new Player(playerCapture, 50, 100, 6);
  this.computer = new Computer(600, 0);
  this.setLevel(lvl1);
  [this.frameSize, this.currFrameCount, this.animIndex] = [6, 0, 0];
}

// Game.prototype.initTilemap = function () {
//   for (let i = 0; i < this.tilemap.length; i++) {
//     for (let j = 0; j < this.tilemap[i].length; j++) {
//       switch (this.tilemap[i][j]) {
//         case "w":
//           this.walls.push(new Wall(envCapture[2], j * 20, i * 20));
//           break;

//         case "t":
//           this.tiles.push(new Tile(envCapture[1], j * 20, i * 20));
//           break;

//         case "d":
//           this.doors = new Door(doors, j * 20, i * 20, 20, 20);
//           break;
//       }
//     }
//   }
// };

Game.prototype.setLevel = function(level) {
  
  // this.computer.terminal = new Terminal(level);
  this.level = new Level(level);
}

Game.prototype.drawGameScreen = function() {

  // Draws the tiles
  for (obj of this.level.tiles) {
    obj.draw();
  }

  // Draws the environment objects
  for (obj of environment) {
    obj.draw();
  }

  // Draw the doors
  this.level.doors.draw();

  // Draws the open when the game is won
  if (game_win) {
    this.level.doors.open();
  }

  // Draws the player
  this.player.draw();

  // Draws the walls
  for (obj of this.level.walls) {
    obj.draw();
  }

  // Checks if the player has won the current level and
  // walks to the door
  if (
    game_win &&
    this.player.check_collision(
      [this.player.x, this.player.y],
      this.level.doors,
      this.level.doors.width / 2 + 16 + 2,
      this.level.doors.height / 2 + 16 + 2
    )
  ) {
    game_win = false;
    changeLvl = true;
    this.computer.terminal.exit();
    popupToggle = false;
    this.player.reset(50, 100, 6);
    // game.state = GAMEOVER;
  }

  if (frameCount - this.currFrameCount > 10) {
    this.animIndex = floor(this.animIndex + 1) % this.frameSize;
    this.currFrameCount = frameCount;
  }

  // If the computer is used
  if (computerToggle) {
    this.computer.draw();
    this.computer.coding();
    this.computer.onKeyPressed();
    this.animIndex = 1;
  } else {
    this.player.onKeyPressed();
  }

  if (popupToggle) {
    popup.draw();
  }

  if (changeLvl) {
    currLvlIndex++;
    switch (currLvlIndex) {
      case 2:
        this.setLevel(level2);
        break;
      default:
        console.log("lmao");
        game.state = GAMEOVER;
        // change to end screen here
        // computer.terminal = new Terminal(level2);
        break;
    }
    changeLvl = false;
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
    if (keyCode == 8 && this.computer.code.length >= 3)
      this.computer.code = this.computer.code.slice(0, -1);
    else if (keyCode == 13) this.computer.terminal.parse(this.computer.code);
    else if (keyCode === 20) capitalize = !capitalize;
    else if (currKey !== undefined) this.computer.code += currKey;
  }
}

function mousePressed() {
  if (startPressed) {
    startPressed = false;
    game.state = GAME;
  }
  if (instPressed) {
    instPressed = false;
    game.state = INSTRUCTIONS;
  }
  if (backPressed) {
    backPressed = false;
    game.state = START;
  }
}

Game.prototype.drawStartScreen = function(){
    push();
                
        background(0);
        fill(0);
        stroke(255);
        let [startX, startY, endX, endY] = [300, 150, 700, 200];
    
        rect(startX, startY, endX - startX, endY - startY);
        fill(0, 255, 0);
        textAlign(CENTER);
        push(); noStroke();
        text('Start', startX, startY + (endY - startY)/2 - 5, endX - startX, endY - startY);
        pop();

        if(mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY){
            startPressed = true;
        }
        else{
            startPressed = false;
        }

        fill(0);
        [startX, startY, endX, endY] = [300, 250, 700, 300];

        rect(startX, startY, endX - startX, endY - startY);

        fill(0, 255, 0);
        push(); noStroke();
        text('Instructions', startX, startY + (endY - startY)/2 - 5, endX - startX, endY - startY);
        pop();
        if(mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY){
            instPressed = true;
        }else{
            instPressed = false;
        }

    pop();
}

Game.prototype.drawInstructionsScreen = function(){
    push();
        
        background(0);
        fill(0);
        stroke(255);
        let [startX, startY, endX, endY] = [10, 10, 70, 50];

        rect(startX, startY, endX - startX, endY - startY);
        
        fill(0, 255, 0);
        noStroke();
        push();textAlign(CENTER);
        text('Return', startX, startY + (endY - startY)/2 - 5, endX - startX, endY - startY);
        pop();

        if(mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY){
            backPressed = true;
        }else{
            backPressed = false;
        }

        [startX, startY, endX, endY] = [100, 50, 500, 100];
        let interval = 40;

        // textAlign(LEFT);

        text('1. Use W-A-S-D keys to move up-left-down-right.', startX, startY + (endY - startY)/2 - 5, endX - startX, endY - startY);
        text('2. Use C to access the terminal when close to a computer.', startX, startY + (endY - startY)/2 - 5 + interval, endX - startX, endY - startY);
        text('3. Use H to access the hint screen.', startX  , startY + (endY - startY)/2 - 5 + interval * 2, endX - startX, endY - startY);

    pop();
}

Game.prototype.drawEndScreen = function(){
    push();
        background(0);
        fill(0);
        stroke(255);
        textAlign(CENTER);
        [startX, startY, endX, endY] = [300, 250, 700, 300];

        rect(startX, startY, endX - startX, endY - startY);

        fill(0, 255, 0);
        push(); noStroke();
        text('Restart', startX, startY + (endY - startY)/2 - 5, endX - startX, endY - startY);

        textSize(20); // Default is 12

        [startX, startY, endX, endY] = [300, 50, 700, 300];

        text('Game Won', startX, startY + (endY - startY)/2 - 5, endX - startX, endY - startY);
        pop();
        if(mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY){
            backPressed = true;
        }else{
            backPressed = false;
        }
    pop();
}
