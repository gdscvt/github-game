class Level{
    constructor(){
        this.walls = [];
        this.tiles = [];
        this.doors = undefined;
    }

    draw(){

    }

    setupProps(){
        this.initTilemap(this.tilemap);
        this.initTilemap(this.objectTilemap);
    }

    initTilemap(map) {
        for (let i = 0; i < map.length; i++) {
          for (let j = 0; j < map[i].length; j++) {
            switch (map[i][j]) {
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
      }
}