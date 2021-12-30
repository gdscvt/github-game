class Popup {
  constructor(msg) {
    this.msg = msg;
    console.log(msg);
  }

  draw() {
    push();
    noStroke();
    fill("#7A7A6C");
    // outer screen
    rect(40, 250 - 40, 500, 150);

    fill(0);

    // inner screen
    rect(25 + 40, 265 - 40, 450, 125);

    fill(0, 255, 0);

    // display msg here
    // textSize(28);
    text(this.msg, 35 + 40, 275 - 40, 325, 265);

    fill(220);
    rect(100, 500, 375, 150);

    pop();
  }
}
