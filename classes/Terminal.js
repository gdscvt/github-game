// "filesRepo": [{"instructions.txt": "UP\nUP\nRIGHT\n"}, {"testing": [{"instructions2.txt":"RIGHT\n"}]}],
class Terminal {
  constructor(dataJson) {
    // requiredData contains tha translated json file into json object
    this.requiredData = dataJson[0];

    if (dataJson[0].solution.length === 0) {
      this.tutorial = dataJson[0].tutorial;
    }
    this.solution = dataJson[0].solution;

    // files contains the array of files from the dataJson
    // url contains the url of the folder from the dataJson
    // currDir contains the files of the current directory; will change
    // when cd is used and stuff
    this.files = [];
    this.url = dataJson[0].url;
    this.currDir = [];
    this.popup = dataJson[0].popup;
    popup = new Popup(this.popup);

    // TODO "repo" to push to
    this.toPush = [];
    this.commitMsg = "";
  }

  parse(c) {
    computer.display += "\n" + c + "\n";
    let cmd = c.split(" ");
    console.log(cmd);

    switch (cmd[1]) {
      case "git":
        this.git(c);
        break;
      case "cd":
        if (cmd.length > 3)
          computer.display +=
            "\nError using cd, only supply one [args], and it must be a folder";
        else this.cd(cmd[2]);
        break;
      case "ls":
        this.ls(this.currDir);
        break;
      case "h":
        this.h(...cmd);
        break;
      case "cat":
        if (cmd.length > 3)
          computer.display += "\nError using cat, only supply one [args]";
        else this.cat(cmd[2]);
        break;
      case "exit":
        this.exit();
        break;
      default:
        computer.display += "\nNo such cmd found! :<\n";
        break;
    }

    computer.code = "> ";

    // Only goes here if this is a tutorial level

    let tutorialPassed = true;

    // TODO needs more work for levels later, and different checks
    if (this.tutorial !== undefined) {
      console.log("Here??\n");
      this.tutorial.forEach((file) => {
        console.log(file);
        let currFileName = Object.keys(file)[0];
        let containsCurrentFile = false;
        for (let i = 0; i < this.files.length; i++) {
          let currFileNameRepo = Object.keys(this.tutorial[i])[0];
          if (currFileName === currFileNameRepo) containsCurrentFile = true;
          if (!containsCurrentFile) tutorialPassed = false;
        }

        if (this.files.length === 0) tutorialPassed = false;
      });

      if (tutorialPassed) {
        // Switches popup msg when tutorial is passed
        computer.display += "\n" + this.requiredData.tutorialCompleteMsg;
        popup = new Popup(this.requiredData.tutorialCompleteMsg);
        game_win = true;
      }
    }
  }

  git(c) {
    let cmd = c.split(" ");
    console.log(cmd);
    switch (cmd[2]) {
      case "add":
        // Only git adds when there's at least one file listed
        if (cmd.length >= 4) {
          for (let i = 3; i < cmd.length; i++) {
            let tobeadded = cmd[i];
            this.currDir.forEach((file) => {
              let currFileName = Object.keys(file)[0];
              if (
                currFileName === tobeadded ||
                tobeadded === "." ||
                tobeadded === "./"
              ) {
                computer.display += `${
                  currFileName.includes(".") ? "File" : "Folder"
                } ${currFileName} is now tracked!\n`;
                this.push = this.toPush.push(file);
              }
            });

            if (tobeadded === "." || tobeadded === "./") break;
          }
        }
        break;
      case "push":
        if (this.toPush.length === 0)
          computer.display += "No files are tracked!\n";

        if (this.commitMsg.length === 0)
          computer.display += "There is no commit message attached\n";

        if (this.toPush.length === 0 || this.commitMsg.length === 0) return;

        // does check to see if repo is the same as the given answers
        let correctSolutionCheck = true;
        console.log(this.toPush);
        console.log(this.solution);
        if (this.toPush.length !== this.solution.length)
          correctSolutionCheck = false;
        this.toPush.forEach((file) => {
          let currFileName = Object.keys(file)[0];
          let containsCurrentFile = false;
          for (let i = 0; i < this.solution.length; i++) {
            let currFileNameRepo = Object.keys(this.solution[i])[0];
            if (currFileName === currFileNameRepo) containsCurrentFile = true;
          }

          if (!containsCurrentFile) correctSolutionCheck = false;
        });

        if (this.tutorial !== undefined) {
          return;
        }

        if (correctSolutionCheck)
          computer.display += `Files tracked are pushed with commit message "${this.commitMsg}"!\n`;
        else
          computer.display += `Required files are not added to repo! Use "git stash" to start over! \n`;
        break;
      case "commit":
        if (this.toPush.length === 0) {
          computer.display +=
            "There is no files tracked to attach commit message to!\n";
          return;
        }

        let commitMsg = c.split('"');

        if (commitMsg.length === 3) {
          this.commitMsg = commitMsg[1];
          computer.display += `Files are tracked with commit message "${this.commitMsg}"\n`;
        } else
          computer.display +=
            "Error, be sure to encase commit message in double quotes\n";
        break;
      case "ls-files":
        this.toPush.forEach((file) => {
          let currFileName = Object.keys(file)[0];

          computer.display += `${
            currFileName.includes(".") ? "File" : "Folder"
          } ${currFileName} is tracked!\n`;
        });
        break;
      case "stash":
        this.toPush = [];
        this.commitMsg = "";
        break;
      case "clone":
        if (this.files.length > 0) {
          computer.display += "Already cloned :<\n";
          return;
        }

        if (cmd[3] !== this.url) {
          computer.display += "Wrong URL :<\n";
          return;
        }

        this.files = this.requiredData.filesRepo;
        this.currDir = this.requiredData.filesRepo;
        computer.display += `Files from given repo cloned! \n`;
        break;
      default:
        computer.display += "No such cmd found! :<\n";
        break;
    }
  }

  cd(folder) {
    if (folder === "..") {
      // checks to see if currently at base directory
      if (directoryPath.length == 1) {
        computer.display += "You're already at the base directory\n";
        return;
      }

      // if cd refers to base dir, then set currDir to the files of base dir
      this.currDir = this.files;

      computer.display += "Back to base directory!\n";
      return;
    }

    let newDir;
    this.currDir.forEach((curr) => {
      let currFileName = Object.keys(curr)[0];
      if (currFileName === folder) {
        // does things to cd into new dir
        directoryPath = `/${folder}/`;
        newDir = curr[folder];
        computer.display += `Now at ${directoryPath}\n`;
      }
    });
    if (newDir !== undefined) this.currDir = newDir;
  }

  cat(file) {
    console.log(file);
    if (!file.includes(".")) {
      computer.display += "\nUse cat on files, not directories!\n";
      return;
    }
    this.currDir.forEach((curr) => {
      let currFileName = Object.keys(curr)[0];
      if (currFileName === file) computer.display += curr[currFileName];
    });
  }

  ls(files) {
    console.log(files);
    files.forEach((file) => {
      let currFileName = Object.keys(file);
      computer.display += `${currFileName}\n`;
    });
  }

  exit() {
    computerToggle = false;
    computer.display = "";
  }
}
