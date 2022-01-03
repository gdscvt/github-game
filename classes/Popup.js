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
    rect(20, 250 - 20, 500, 150);

    fill(0);

    // inner screen
    rect(25 + 10, 265 - 20, 465, 120);

    fill(0, 255, 0);

    // display msg here
    // textSize(28);
    text(this.msg, 35 + 20, 275 - 20, 460, 265);

    fill(220);
    rect(100, 500, 375, 150);

    pop();
  }
}
