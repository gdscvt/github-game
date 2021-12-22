class Computer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.scrollX = x + 50;
    this.scrollY = y + 75;
    this.scrollSpeed = 1;
    this.code = "> ";
    this.display = "";
    this.terminal = undefined;
  }

  draw() {
    push();
    noStroke();
    fill("#7A7A6C");
    rect(this.x, this.y + 25, 375, 350);

    fill(0);
    // Output Screen
    rect(this.x + 25, this.y + 50, 325, 225);

    // Display of output
    fill(0, 255, 0);
    this.t_height = 200 + abs((this.y + 75)- this.scrollY);
    text(this.display, this.scrollX, this.scrollY, 325, this.t_height); 

    fill("#7A7A6C");
    rect(this.x, this.y + 25, 375, 25);

    fill("#7A7A6C");
    rect(this.x, this.y + 275, 375, 25);

    fill("#7A7A6C");
    rect(this.x, this.y + 350, 375, 25);

    fill(220);
    rect(this.x, this.y + 375, 375, 25);

    fill(220);
    rect(this.x, this.y, 375, 25);

    fill(0);
    // Text entry Screen
    rect(this.x + 25, this.y + 300, 325, 50);

    pop();
  }

  coding() {
    // Code entered
    push();
    fill(0, 255, 0);
    text(this.code, this.x + 50, this.y + 325, 300, 25);
    pop();
  }

  // Going to the latest line entered
  scrollDown(){
    if(this.scrollY + this.t_height >= this.y + 275)
      this.scrollY -= this.scrollSpeed;
  }

  scrollUp(){
    if(this.scrollY <= this.y + 50)
      this.scrollY += this.scrollSpeed;
  }

  onKeyPressed() {
    if (keyIsDown(38)) computer.scrollUp();
    else if (keyIsDown(40)) computer.scrollDown();
  }
}
