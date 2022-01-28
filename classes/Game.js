let [startPressed, instPressed, backPressed] = [false, false, false];

function Game() {
  this.tilemap = [
    "wwwwwwwwwwwwwwwwwwwwwwwwdwwwwwwwwwwwwwwwwwwwwwwwww",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wt t t t t t t t t t t t t t t t t t t t t t t t w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  ];
  
  this.level = undefined;
  this.state = 0;
}

Game.prototype.initTilemap = function () {
  for (let i = 0; i < this.tilemap.length; i++) {
    for (let j = 0; j < this.tilemap[i].length; j++) {
      switch (this.tilemap[i][j]) {
        case "w":
          this.walls.push(new Wall(envCapture[2], j * 20, i * 20));
          break;

        case "t":
          this.tiles.push(new Tile(envCapture[1], j * 20, i * 20));
          break;

        case "d":
          this.doors = new Door(doors, j * 20, i * 20, 20, 20);
          break;
      }
    }
  }
};

Game.prototype.drawStartScreen = function () {
  push();

  background(0);
  fill(0);
  stroke(255);
  let [startX, startY, endX, endY] = [300, 150, 700, 200];

  rect(startX, startY, endX - startX, endY - startY);
  fill(0, 255, 0);
  textAlign(CENTER);
  push();
  noStroke();
  text(
    "Start",
    startX,
    startY + (endY - startY) / 2 - 5,
    endX - startX,
    endY - startY
  );
  pop();

  if (mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY) {
    startPressed = true;
  } else {
    startPressed = false;
  }

  fill(0);
  [startX, startY, endX, endY] = [300, 250, 700, 300];

  rect(startX, startY, endX - startX, endY - startY);

  fill(0, 255, 0);
  push();
  noStroke();
  text(
    "Instructions",
    startX,
    startY + (endY - startY) / 2 - 5,
    endX - startX,
    endY - startY
  );
  pop();
  if (mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY) {
    instPressed = true;
  } else {
    instPressed = false;
  }

  pop();
};

Game.prototype.drawInstructionsScreen = function () {
  push();

  background(0);
  fill(0);
  stroke(255);
  let [startX, startY, endX, endY] = [10, 10, 70, 50];

  rect(startX, startY, endX - startX, endY - startY);

  fill(0, 255, 0);
  noStroke();
  push();
  textAlign(CENTER);
  text(
    "Return",
    startX,
    startY + (endY - startY) / 2 - 5,
    endX - startX,
    endY - startY
  );
  pop();

  if (mouseX < endX && mouseX > startX && mouseY < endY && mouseY > startY) {
    backPressed = true;
  } else {
    backPressed = false;
  }

  [startX, startY, endX, endY] = [100, 50, 500, 100];
  let interval = 40;

  // textAlign(LEFT);

  text(
    "1. Use W-A-S-D keys to move up-left-down-right.",
    startX,
    startY + (endY - startY) / 2 - 5,
    endX - startX,
    endY - startY
  );
  text(
    "2. Use C to access the terminal when close to a computer.",
    startX,
    startY + (endY - startY) / 2 - 5 + interval,
    endX - startX,
    endY - startY
  );
  text(
    "3. Use H to access the hint screen.",
    startX,
    startY + (endY - startY) / 2 - 5 + interval * 2,
    endX - startX,
    endY - startY
  );

  pop();
};

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
