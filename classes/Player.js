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
    [this.x, this.y, this.speed] = [x, y, 1];
  }

  draw() {
    // this.onKeyPressed();
    image(
      this.sprite[dirString[this.currAnimation]][animIndex],
      this.x - 16,
      this.y - 16,
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

  check_collision(projection, obj, constraint_x, constraint_y){
    
    let hort_distance = dist(projection[0], 0, obj.x, 0);
    let vert_distance =  dist(0, projection[1], 0, obj.y);

    if(vert_distance < constraint_y && hort_distance < constraint_x){

      print('(' + obj.x + ',' + obj.y + ') blocked when player is at (' + this.x + ',' + this.y + ')')
      print('Euc Dist= h( '+ hort_distance+' ) v( '+ vert_distance +' )')

      return true;
    }

    return false;
  }

  check_collision_env(theta){
    for (let obj of environment){
      
      if(this.check_collision(theta, obj, obj.width/2 + 16 - 5, obj.height/2 + 16 - 5)){
        return true;
      }
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

    // Player threshold = 32/2 = 16
    // Wall threshold = 20/2 = 10
    // Collision threshold = 10 + 16 = 26
    for (let obj of game.walls){
      
      if(this.check_collision(theta, obj, 26, 26)){
        theta = [this.x, this.y];
        break;
      }
    }

    if(this.check_collision_env(theta))
      theta = [this.x, this.y];

    this.x =
      // theta[0] < canvasWidth - this.sizeX && 
      theta[0] > 0 ? theta[0] : this.x;
    this.y =
      // theta[1] < canvasHeight - this.sizeY && 
      theta[1] > 0 ? theta[1] : this.y;
  }

  reset(x, y, frame = 0){
    this.x = x;
    this.y = y;
    this.frame = frame;
  }
}
