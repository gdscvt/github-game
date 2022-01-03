// Template for Environment objects
class Environment{
    constructor(image, x, y){
        this.x = x;
        this.y = y;
        this.image = image;
    }
}

// Template for Env Objects
class EnvObjects extends Environment{
    constructor(image, x, y,  w, h, rotation= 0){
        super(image, x + w/2, y + h/2);
    
        [this.rotation, this.width, this.height] = [rotation, w, h];
    }

    draw(){
        push();
            translate(this.x - this.width/2, this.y - this.height/2);
            rotate(this.rotation);
            image(this.image, 0, 0, this.width, this.height);
        pop();
    }
}

// Template for Tile class
class Tile extends Environment{
    constructor(image, x, y){
        super(image, x, y);
    }

    draw(){
        push();
            image(this.image, this.x, this.y, 40, 20);
        pop();
    }
}

// Template for Wall class
class Wall extends Environment{
    constructor(image, x, y){
        super(image, x + 10, y + 10);
    }

    draw(){
        push();
            image(this.image, this.x - 10, this.y - 10, 20, 20);
        pop();
    }
}

class Door{
    constructor(images, x, y, w, h){
        this.images = images;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.index = 0;
    }
    draw(){
        push();
            let index = floor(this.index) % this.images.length;
            image(this.images[index], this.x, this.y, this.width, this.height);
        pop();
    }

    open(){
        if(floor(this.index + 0.05) % this.images.length != this.images.length - 1)
            this.index += 0.05;
    }

    close(){
        print(floor(this.index - 0.05) % this.images.length)
        if(floor(this.index -= 0.05) % this.images.length != 0)
            this.index -= 0.05;
    }
}