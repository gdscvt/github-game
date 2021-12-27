// Template for Environment objects
function Environment(image, x, y){
    this.x = x;
    this.y = y;
    this.image = image;
}

// Template for Env Objects
function EnvObjects(image, x, y,  w, h, rotation= 0){
    Environment.call(this, image, x, y);

    [this.rotation, this.width, this.height] = [rotation, w, h];
}
EnvObjects.prototype = Object.create(Environment.prototype);

EnvObjects.prototype.draw = function(){
    push();
        translate(this.x, this.y);
        rotate(this.rotation);
        image(this.image, 0, 0, this.width, this.height);
    pop();
}

function Tile(image, x, y){
    Environment.call(this, image, x, y);
}

Tile.prototype = Object.create(Tile.prototype);

Tile.prototype.draw = function(){
    push();
        image(this.image, this.x, this.y, 40, 20);
    pop();
}

function Wall(image, x, y){
    Environment.call(this, image, x - 10, y - 10);
}

Wall.prototype = Object.create(Wall.prototype);

Wall.prototype.draw = function(){
    push();
        image(this.image, this.x + 10, this.y + 10, 20, 20);
    pop();
}


Object.defineProperty(EnvObjects.prototype, 'constructor', {
    value: EnvObjects,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

Object.defineProperty(Tile.prototype, 'constructor', {
    value: Tile,
    enumerable: true, // so that it does not appear in 'for in' loop
    writable: true });

Object.defineProperty(Wall.prototype, 'constructor', {
    value: Wall,
    enumerable: true, // so that it does not appear in 'for in' loop
    writable: true });