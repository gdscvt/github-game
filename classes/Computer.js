class Computer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
    // Text entry Screen
    rect(this.x + 25, this.y + 300, 325, 50);

    // Display of output
    fill(0, 255, 0);
    text(this.display, this.x + 50, this.y + 75, 325, 200);
    pop();
  }

  coding() {
    // Code entered
    push();
    fill(0, 255, 0);
    text(this.code, this.x + 50, this.y + 325, 300, 25);
    pop();
  }

  onKeyPressed() {}
}
