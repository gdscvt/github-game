function Game(){
    this.tilemap = [
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
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
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
    ]
    this.walls = [];
    this.tiles = [];
}

Game.prototype.initTilemap = function(){
    for(let i = 0; i < this.tilemap.length; i++){
        for(let j = 0; j < this.tilemap[i].length; j++){
            switch (this.tilemap[i][j]) {
                case 'w': 
                    this.walls.push(new Wall(envCapture[2], j*20, i*20));
                    break;

                case 't':
                    this.tiles.push(new Tile(envCapture[1], j*20, i*20));
                    break;
            }
        }
    }
}