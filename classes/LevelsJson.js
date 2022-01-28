class LevelsJson {
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
  }
}
