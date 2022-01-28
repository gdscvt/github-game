class Level {
  terminalLevel; // Boolean, checks to see if current level requires terminal conditions
  winningCondition; // Function, checks if winning conditions are satisfied or not
  tileMap; // Tile map for curr level
  objectTileMap; // Props tile map for curr level
  filesRepo; // array, Directory in fake github repo
  files; // array, files in current directory
  url; // String, url needed to git clone from
  tutorial; // Boolean, true if tutorial else a normal level
  tutorialCompleteMsg; // String, popup msg when win
  popup; // String, hints on how to win curr level

  constructor(data) {
    Object.assign(this, data);
    this.walls = [];
    this.tiles = [];
    this.doors = undefined;

    this.setupProps();
    this.cmdHistory = [];
    computer.terminal = new Terminal({
      filesRepo: this.filesRepo,
      files: this.files,
      url: this.url,
      tutorial: this.tutorial,
      tutorialCompleteMsg: this.tutorialCompleteMsg,
      popup: this.popup,
      cmdHistory: this.cmdHistory,
    });
  }

  draw() {
    if (this.winningCondition(this.cmdHistory)) game_win = true;
  }

  setupProps() {
    this.initTilemap(this.tileMap);
    // this.initTilemap(this.objectTilemap);
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
