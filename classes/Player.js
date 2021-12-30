const [KEY_W, KEY_A, KEY_D, KEY_S, KEY_M, KEY_P, KEY_SPACE] = [
  87, 65, 68, 83, 77, 80,
];
const [UP, DOWN, LEFT, RIGHT] = [0, 1, 2, 3];
const [up, down, left, right] = ["up", "down", "left", "right"];
const dirString = [up, down, left, right];

class Player {
  constructor(img, x = 0, y = 0, frame = 0, sizeX = 32, sizeY = 32) {
    [this.sprite, this.frames, this.currAnimation, this.sizeX, this.sizeY] = [
      img,
      frame,
      DOWN,
      sizeX,
      sizeY,
    ];
    [this.x, this.y, this.speed] = [x - 16, y - 16, 1];
  }

  draw() {
    // this.onKeyPressed();
    image(
      this.sprite[dirString[this.currAnimation]][animIndex],
      this.x + 16,
      this.y + 16,
      this.sizeX,
      this.sizeY
    );
  }

  moveDir(direction) {
    switch (direction) {
      case UP:
        this.currAnimation = UP;
        return [this.x, this.y - this.speed];
      case DOWN:
        this.currAnimation = DOWN;
        return [this.x, this.y + this.speed];
      case LEFT:
        this.currAnimation = LEFT;
        return [this.x - this.speed, this.y];
      case RIGHT:
        this.currAnimation = RIGHT;
        return [this.x + this.speed, this.y];
      default:
        animIndex = 1;
        return [this.x, this.y];
    }
  }

  check_collision(projection, obj, constraint){
    
    let vert_distance = dist(this.x + projection[0], 0, obj.x, 0);
    let hort_distance =  dist(0, this.y + projection[1], 0, obj.y);
    if(vert_distance < constraint && hort_distance < constraint){
    // let distance = dist(this.x + projection[0], this.y + projection[1], obj.x, obj.y);
    // if(distance < constraint){
      return true;
    }

    return false;
  }

  onKeyPressed() {
    let theta = [];
    if (keyIsDown(KEY_S)) theta = this.moveDir(DOWN);
    else if (keyIsDown(KEY_W)) theta = this.moveDir(UP);
    else if (keyIsDown(KEY_A)) theta = this.moveDir(LEFT);
    else if (keyIsDown(KEY_D)) theta = this.moveDir(RIGHT);
    else theta = this.moveDir();

    // for (let obj of game.walls){
    //   if(theta != [0, 0] && this.check_collision([1,1], obj, 26)){
    //     theta = [0, 0];
    //     break;
    //   }
    // }

    this.x =
      theta[0] < canvasWidth - this.sizeX && theta[0] > 0 ? theta[0] : this.x;
    this.y =
      theta[1] < canvasHeight - this.sizeY && theta[1] > 0 ? theta[1] : this.y;
  }
}
